export interface OTPSettings {
  secret: string;
  enabled: boolean;
}

export interface UserProps {
  id: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;

  otp?: OTPSettings;
}

export class User {
  private props: Required<Omit<UserProps, "otp">> & { otp: OTPSettings };

  constructor(props: UserProps) {
    this.validate(props);

    this.props = {
      id: props.id,
      email: props.email,
      passwordHash: props.passwordHash,
      createdAt: props.createdAt || new Date(),
      updatedAt: props.updatedAt || new Date(),
      otp: props.otp ?? { secret: "", enabled: false },
    };
  }

  getProps(): Readonly<typeof this.props> {
    return {
      id: this.props.id,
      email: this.props.email,
      passwordHash: this.props.passwordHash,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
      otp: this.props.otp,
    };
  }

  hasEmptyEmail() {
    return !this.props.email;
  }

  private validate(props: UserProps): void {
    if (!props.email || props.email.trim() === "") {
      throw new Error("L'email est requis.");
    }

    const email = props.email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("L'email est invalide.");
    }

    if (!props.passwordHash || props.passwordHash.trim() === "") {
      throw new Error("Le hash du mot de passe est requis.");
    }

    // OTP coherence (optional but helps)
    if (props.otp?.enabled && !props.otp.secret) {
      throw new Error("OTP activé mais secret manquant.");
    }
  }
}