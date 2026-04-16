import { render, screen } from '@testing-library/react';
import { RegisterForm } from '../components/RegisterForm';
import { AuthProvider } from '../hooks/useAuth';

describe('Register Component', () => {
  const setup = (props = {}) => {
    const defaultProps = {
      email: 'test@example.com',
      password: 'Test123@1234',
    };

    render(
      <AuthProvider>
        <RegisterForm/>
      </AuthProvider>
    );
  };

  it('should display input fields for registration', () => {
    setup();
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');

    
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it('should have a button to submit registration', () => {
    setup();
    const submitButton = screen.getByRole('button', { name: /Register/i });
    expect(submitButton).toBeInTheDocument();
  });

  it('should not accept the registration when at least one field is empty', () => {
    setup({ email: '' });
    const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
    expect(emailInput.value).toBe('');
    expect(emailInput).toBeRequired();
  });

  it('should disable submit button when password isn\'t valid', () => {
    setup({ password: 'invalid' });
    const submitButton = screen.getByRole('button', { name: /Register/i });
    expect(submitButton).toBeDisabled();
  });
});