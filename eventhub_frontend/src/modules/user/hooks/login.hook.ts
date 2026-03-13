import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';
import type { LoginData } from '../models/login.model';

export const useLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState<LoginData>({ email: '', password: '' });
  const [otpCode, setOtpCode] = useState('');
  const [otpRequired, setOtpRequired] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field: keyof LoginData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setIsLoading(true);

    try {
      const result = await login({
        ...form,
        ...(otpRequired ? { otpCode: otpCode.trim() } : {}),
      });

      if (result?.otpRequired) {
        setOtpRequired(true);
        setMessage('Entrez votre code 2FA pour continuer.');
      } else {
        navigate('/profile');
      }
    } catch (e: any) {
      setMessage(e.message || 'Email ou mot de passe invalide.');
    } finally {
      setIsLoading(false);
    }
  };

  const cancelOtp = () => {
    setOtpRequired(false);
    setOtpCode('');
    setMessage('');
  };

  return {
    form,
    otpCode,
    setOtpCode,
    otpRequired,
    message,
    isLoading,
    handleChange,
    handleSubmit,
    cancelOtp,
  };
};