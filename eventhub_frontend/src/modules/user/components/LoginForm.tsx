import type React from "react";
import { FormInput } from "./forms/FormInput";
import { useLogin } from "../hooks/login.hook";

export const LoginForm: React.FC = () => {
  const hook = useLogin();

  return (
    <div>
      <h2>Connexion</h2>
      {hook.message && <p>{hook.message}</p>}

      <form onSubmit={hook.handleSubmit}>
        <FormInput id="loginEmail" label="Email" type="email" value={hook.form.email} onChange={hook.handleChange("email")} placeholder="email@example.com" required disabled={hook.otpRequired} />
        <FormInput id="loginPassword" label="Password" type="password" value={hook.form.password} onChange={hook.handleChange("password")} placeholder="Password" required disabled={hook.otpRequired} />

        {hook.otpRequired && (
          <FormInput id="loginOtp" label="Code 2FA" type="text" value={hook.otpCode} onChange={(e) => hook.setOtpCode(e.target.value)} placeholder="123456 ou code de secours" required maxLength={12} />
        )}

        <button type="submit" disabled={hook.isLoading}>
          {hook.isLoading ? "Connexion..." : hook.otpRequired ? "Valider le code 2FA" : "Login"}
        </button>

        {hook.otpRequired && (
          <button type="button" onClick={hook.cancelOtp} style={{ marginLeft: 10 }}>
            Annuler
          </button>
        )}
      </form>
    </div>
  );
};