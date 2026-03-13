import type { LoginData } from '../models/login.model'
import type { RegisterData } from '../models/register.model'

type AnyJson = Record<string, any>

async function readJson(res: Response) {
  const text = await res.text()
  const ct = res.headers.get('content-type') ?? ''


  if (!ct.includes('application/json')) {
    return { __raw: text, __notJson: true }
  }

  return text ? JSON.parse(text) : null
}

function extractErrorMessage(json: any): string {

  if (json?.__notJson) {
    return json.__raw?.slice(0, 200) || 'Request failed (non-JSON response)'
  }
  return json?.error?.message ?? json?.message ?? json?.data?.message ?? 'Request failed'
}

function dataParser(json: AnyJson) {
  if (json && typeof json === 'object') {
    if (json.status === 'success' && 'data' in json) return json.data
    if (json.success === true && 'data' in json) return json.data
  }
  return json
}

function requireToken(token: string) {
  if (!token) throw new Error('Missing access token')
  return token
}

export type ApiLoginResponse = {
  token?: string
  user?: { id: string; email: string; otpEnabled?: boolean }
  otpRequired?: boolean
  message?: string
}

export async function apiRegister(input: RegisterData) {
  const payload = { email: input.email, password: input.password }

  const res = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  const json = await readJson(res)
  if (!res.ok) throw new Error(extractErrorMessage(json))

  return dataParser(json)
}

export async function apiLogin(input: LoginData & { otpCode?: string }): Promise<ApiLoginResponse> {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: input.email,
      password: input.password,
      ...(input.otpCode ? { otpCode: input.otpCode } : {}),
    }),
    credentials: 'include', 
  })

  const json = await readJson(res)
  if (!res.ok) throw new Error(extractErrorMessage(json))

  const data = dataParser(json)

  if (data?.otpRequired) {
    return { otpRequired: true, message: data.message }
  }

  const user = data?.user ?? data?.data?.user

  return {
    user: user
      ? {
          id: user.id,
          email: user.email,
          otpEnabled: !!user.otpEnabled,
        }
      : undefined,
  }
}

export type ApiQrCode = {
  image: string
  username?: string
  secret?: string
}

export async function apiGetQrCode(): Promise<ApiQrCode> {
  const res = await fetch('/api/a2f/qrcode', {
    method: 'GET',
    credentials: 'include',
  })

  const json = await readJson(res)
  if (!res.ok) throw new Error(extractErrorMessage(json))

  const data = dataParser(json)
  const qr = data?.qrCode ?? data?.data?.qrCode
  if (!qr?.image) throw new Error('QR response missing image')

  return qr as ApiQrCode
}

export async function apiEnable2FA(  code: string): Promise<{ message: string; backupCodes: string[] }> {

  const res = await fetch('/api/a2f/enable', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ code }),
  })

  const json = await readJson(res)
  if (!res.ok) throw new Error(extractErrorMessage(json))

  return dataParser(json)
}

export async function apiDisable2FA(): Promise<{ message: string }> {

  const res = await fetch('/api/a2f/disable', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })

  const json = await readJson(res)
  if (!res.ok) throw new Error(extractErrorMessage(json))

  return dataParser(json)
}