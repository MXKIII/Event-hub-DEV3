import { render, screen } from '@testing-library/react';
import { RegisterForm } from '../components/RegisterForm';
import { AuthProvider } from '../hooks/useAuth';

describe('Register Component', () => {
  const setup = (props = {}) => {
    const defaultProps = {
      email: 'test@example.com',
      username: 'testuser',
      password: 'Test123@1234',
      firstName: 'Test',
      lastName: 'User'
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
    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    const firstNameInput = screen.getByLabelText('First Name');
    const lastNameInput = screen.getByLabelText('Last Name');
    
    expect(emailInput).toBeInTheDocument();
    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(firstNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
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