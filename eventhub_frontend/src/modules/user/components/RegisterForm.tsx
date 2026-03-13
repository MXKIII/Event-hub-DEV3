import type React from "react";
import { FormInput } from "./forms/FormInput";
import { useRegister } from "../hooks/register.hook";

export const RegisterForm: React.FC = () => {
  const hook = useRegister();

  return (
    <div>
      <h2>Inscription</h2>
      {hook.message && <p>{hook.message}</p>}

      <form onSubmit={hook.handleSubmit}>
        <FormInput id="registerEmail" label="Email" type="email" value={hook.form.email} onChange={hook.handleChange("email")} placeholder="email@example.com" required />
        <FormInput id="registerPassword" label="Password" type="password" value={hook.form.password} onChange={hook.handleChange("password")} placeholder="Minimum 12 caractères" required />
        <button type="submit" disabled={!hook.isPasswordValid}>Register</button>
      </form>

      <h3>Requis du mot de passe</h3>
      {!hook.isPasswordValid && hook.form.password && (
        <ul style={{ listStyle: "none" }}>
          {hook.passwordErrors.map((error, index) => <li key={index}>{error}</li>)}
        </ul>
      )}
    </div>
  );
};