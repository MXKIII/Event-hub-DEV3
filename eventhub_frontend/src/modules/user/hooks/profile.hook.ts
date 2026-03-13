import { useState } from 'react';
import { useAuth } from './useAuth';
import { UserData } from '../models/profile.model';
import { apiGetQrCode, apiEnable2FA, apiDisable2FA, type ApiQrCode } from '../services/auth.api';
import { useNavigate } from 'react-router-dom';

export const useProfile = () => {
  const { currentUser, logout, updateProfile } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<UserData>>({});
  const [message, setMessage] = useState('');
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [qr, setQr] = useState<ApiQrCode | null>(null);
  const [otpCode, setOtpCode] = useState('');
  const [activationError, setActivationError] = useState('');
  const [activationSuccess, setActivationSuccess] = useState('');
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [disableMessage, setDisableMessage] = useState('');
  const navigate = useNavigate();

  const handleEdit = () => {
    setIsEditing(true);
    setEditForm({ email: currentUser?.email, username: currentUser?.username });
    setMessage('');
  };

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleCancel = () => {
    setIsEditing(false);
    setEditForm({});
    setMessage('');
  };

  const handleChange = (field: keyof UserData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditForm((prev) => ({ ...prev, [field]: e.target.value }));
    setMessage('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(editForm);
    setMessage('Profil mis à jour avec succès !');
    setIsEditing(false);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleOpen2FAModal = async () => {
    setActivationError('');
    setActivationSuccess('');
    setOtpCode('');
    setBackupCodes([]);
    setShow2FAModal(true);
    try {
      const data = await apiGetQrCode();
      setQr(data);
    } catch (e: any) {
      setActivationError(e.message || 'Impossible de récupérer le QR Code.');
    }
  };

  const handleClose2FAModal = () => {
    setShow2FAModal(false);
    setQr(null);
  };

  const handleEnable2FA = async () => {
    if (!otpCode) return;
    setActivationError('');
    try {
      const res = await apiEnable2FA(otpCode);
      setActivationSuccess(res.message);
      setBackupCodes(res.backupCodes || []);
      updateProfile({ otpEnabled: true });
    } catch (e: any) {
      setActivationError(e.message || 'Code invalide.');
    }
  };

  const handleDisable2FA = async () => {
    if (!window.confirm('Êtes-vous sûr de vouloir désactiver la double authentification ? Vos codes de secours seront détruits.'))
      return;
    try {
      const res = await apiDisable2FA();
      updateProfile({ otpEnabled: false });
      setDisableMessage(res.message);
      setTimeout(() => setDisableMessage(''), 3000);
    } catch (e: any) {
      setMessage(e.message);
    }
  };

  return {
    currentUser,
    logout: handleLogout,
    isEditing,
    editForm,
    message,
    show2FAModal,
    qr,
    otpCode,
    setOtpCode,
    activationError,
    activationSuccess,
    backupCodes,
    disableMessage,
    handleEdit,
    handleCancel,
    handleChange,
    handleSubmit,
    handleOpen2FAModal,
    handleClose2FAModal,
    handleEnable2FA,
    handleDisable2FA,
  };
};