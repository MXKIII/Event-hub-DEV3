import React from 'react';
import { FormInput } from './forms/FormInput';
import { useProfile } from '../hooks/profile.hook';

export const ProfilePage: React.FC = () => {
  const hook = useProfile();

  return (
    <>
      <div style={{ padding: 20 }}>
        <h2>Profile</h2>
        {hook.message && <p style={{ color: 'green' }}>{hook.message}</p>}

        {!hook.isEditing ? (
          <div>
            <p><strong>ID:</strong> {hook.currentUser?.id}</p>
            <p><strong>Email:</strong> {hook.currentUser?.email}</p>
            <p><strong>Username:</strong> {hook.currentUser?.username}</p>
            <p><strong>2FA:</strong> {hook.currentUser?.otpEnabled
              ? <span style={{ color: 'green', fontWeight: 'bold' }}>Activé</span>
              : <span style={{ color: 'gray' }}>Inactif</span>}
            </p>

            <div style={{ display: 'flex', gap: 10, marginTop: 10, alignItems: 'center' }}>
              <button onClick={hook.handleEdit}>Editer le profil</button>
              <button onClick={hook.logout} style={{ backgroundColor: '#f44336', color: 'white' }}>Se déconnecter</button>
              {!hook.currentUser?.otpEnabled ? (
                <button onClick={hook.handleOpen2FAModal} style={{ backgroundColor: '#2196F3', color: 'white' }}>
                  Activer la double authentification
                </button>
              ) : (
                <button onClick={hook.handleDisable2FA} style={{ backgroundColor: '#f44336', color: 'white' }}>
                  Désactiver 2FA
                </button>
              )}
            </div>
            {hook.disableMessage && <p style={{ color: 'orange', marginTop: 10 }}>{hook.disableMessage}</p>}
          </div>
        ) : (
          <form onSubmit={hook.handleSubmit}>
            <FormInput id="profileEmail" label="Email" type="email" value={hook.editForm.email || ''} onChange={hook.handleChange("email")} required />
            <FormInput id="profileUsername" label="Username" type="text" value={hook.editForm.username || ''} onChange={hook.handleChange("username")} required />
            <button type="submit">Save Changes</button>
            <button type="button" onClick={hook.handleCancel}>Cancel</button>
          </form>
        )}
      </div>

      {hook.show2FAModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: 'white', padding: 24, borderRadius: 8, maxWidth: 500, width: '100%' }}>
            <h3>Configuration 2FA</h3>
            {hook.activationError && <p style={{ color: 'red' }}>{hook.activationError}</p>}

            {!hook.activationSuccess ? (
              <>
                <p>1. Scannez le QR Code :</p>
                <div style={{ textAlign: 'center', margin: '20px 0', minHeight: 200 }}>
                  {hook.qr ? (
                    <div style={{ background: '#f0f0f0', display: 'inline-block', padding: 10 }}>
                      {hook.qr.image.trim().startsWith('<svg')
                        ? <div dangerouslySetInnerHTML={{ __html: hook.qr.image }} />
                        : <img src={hook.qr.image} alt="QR Code" style={{ width: 200, height: 200 }} />}
                    </div>
                  ) : <p>Chargement du QR Code...</p>}
                </div>
                <p>2. Entrez le code à 6 chiffres :</p>
                <div style={{ display: 'flex', gap: 10 }}>
                  <input type="text" placeholder="123456" value={hook.otpCode} onChange={(e) => hook.setOtpCode(e.target.value)} maxLength={6} style={{ padding: 8, fontSize: 16, width: '100%' }} />
                  <button onClick={hook.handleEnable2FA} disabled={!hook.otpCode || hook.otpCode.length < 6}>Vérifier</button>
                </div>
              </>
            ) : (
              <div>
                <p style={{ color: 'green', fontWeight: 'bold' }}>{hook.activationSuccess}</p>
                <p><strong>IMPORTANT : Sauvegardez vos codes de secours. Ils ne seront plus affichés.</strong></p>
                <div style={{ background: '#eee', padding: 10, borderRadius: 4, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5, fontFamily: 'monospace' }}>
                  {hook.backupCodes.map((code, idx) => <div key={idx} style={{ borderBottom: '1px solid #ddd' }}>{code}</div>)}
                </div>
                <div style={{ marginTop: 20, textAlign: 'right' }}>
                  <button onClick={hook.handleClose2FAModal}>Terminer</button>
                </div>
              </div>
            )}

            {!hook.activationSuccess && (
              <div style={{ marginTop: 20, textAlign: 'right' }}>
                <button onClick={hook.handleClose2FAModal} style={{ background: 'transparent', border: '1px solid #ccc', color: '#333' }}>Annuler</button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};