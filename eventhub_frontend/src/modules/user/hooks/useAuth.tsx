import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { UserData } from '../models/profile.model'
import { apiLogin, apiRegister} from '../services/auth.api'
import { AuthContextType } from '../models/auth.model'



const AuthContext = createContext<AuthContextType | undefined>(undefined)

const USER_KEY = localStorage.getItem('eventhub_user_key') 

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserData | null>(null)

  useEffect(() => {
    const savedUser = USER_KEY
    if (savedUser) setCurrentUser(JSON.parse(savedUser))
  }, [])

  const isAuthenticated = Boolean(currentUser)

  const register: AuthContextType['register'] = async (data) => {
    await apiRegister(data)
  }

  const login: AuthContextType['login'] = async (data) => {
    const res = await apiLogin(data)
    if (res.otpRequired) {
      return res
    }
    if (res.user) {
      const mappedUser: UserData = {
        id: res.user.id,
        email: res.user.email,
        username: data.email.split('@')[0],
      }
      setCurrentUser(mappedUser)
      localStorage.setItem('eventhub_user_key', JSON.stringify(mappedUser))
    }
    return res
  }

  const logout = () => {
    setCurrentUser(null)
    localStorage.removeItem('eventhub_user_key')
    
  }

  const updateProfile: AuthContextType['updateProfile'] = (patch) => {
    setCurrentUser((prev) => {
      const next = prev ? { ...prev, ...patch } : (null as any)
      if (next) localStorage.setItem('eventhub_user_key', JSON.stringify(next))
      return next
    })
  }

  const value = useMemo(
    () => ({
      currentUser,
      isAuthenticated,
      register,
      login,
      logout,
      updateProfile,
    }),
    [currentUser, isAuthenticated],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}