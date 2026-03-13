import { useState } from 'react';
import { useAuth } from './useAuth';
import { validatePassword } from '../utils/validate';
import type { RegisterData } from '../models/register.model';

export const useRegister = () => {
  const { register } = useAuth();

  const [form, setForm] = useState<RegisterData>({ email: '', password: '', username: '' });
  const [message, setMessage] = useState('');

  const passwordErrors = validatePassword(form.password);
  const isPasswordValid = passwordErrors.length === 0;

  const handleChange = (field: keyof RegisterData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPasswordValid) {
      setMessage('Le mot de passe ne répond pas aux exigences.');
      return;
    }
    try {
      await register(form);
      setMessage('Inscription réussie ! Vous pouvez maintenant vous connecter.');
      setForm({ email: '', password: '', username: '' });
    } catch (e: any) {
      setMessage(e.message || "Erreur lors de l'inscription.");
    }
  };

  return {
    form,
    message,
    passwordErrors,
    isPasswordValid,
    handleChange,
    handleSubmit,
  };
};