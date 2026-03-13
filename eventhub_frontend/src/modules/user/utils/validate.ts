export const validatePassword = (password: string | undefined): string[] => {
  const errors: string[] = [];
  if (!password) return ['Le mot de passe est requis'];
  if (password.length !== 12) {
    errors.push('il doit faire exactement 12 caractères');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Au moins une majuscule');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Au moins une minuscule');
  }
  if (!/\d/.test(password)) {
    errors.push('Au moins un chiffre');
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Au moins un caractère spécial');
  }

  return errors;
};

