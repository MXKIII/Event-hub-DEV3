import { render, screen, fireEvent } from '@testing-library/react';
import { LoginForm } from '../components/LoginForm';
import { AuthProvider } from '../hooks/useAuth';
import { MemoryRouter } from 'react-router-dom';

describe('Login Component', () => {
  const setup = () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <LoginForm />
        </AuthProvider>
      </MemoryRouter>
    );
  };

  it('should display input fields for login', () => {
    setup();
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it('should have a button to submit login', () => {
    setup();
    const submitButton = screen.getByRole('button', { name: /Login/i });
    expect(submitButton).toBeInTheDocument();
  });
  
  it('should allow user to type in email and password', () => {
    setup();
    const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
    const passwordInput = screen.getByLabelText('Password') as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password@123' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('Password@123');
  });

  it('should require email and password fields to be filled', () => {
    setup();
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    expect(emailInput).toBeRequired();
    expect(passwordInput).toBeRequired();
  });

  it('should submit the form when the login button is clicked', () => {
    setup();
    const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
    const passwordInput = screen.getByLabelText('Password') as HTMLInputElement;
    const submitButton = screen.getByRole('button', { name: /Login/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password@123' } });
    fireEvent.click(submitButton);

    // Vérifier qu'un message d'erreur apparaît (utilisateur non enregistré)
    expect(screen.getByText(/Email ou mot de passe invalide/i)).toBeInTheDocument();
  });

  it('should check that the password exists', () => {
    setup();
    const passwordInput = screen.getByLabelText('Password') as HTMLInputElement;
    fireEvent.change(passwordInput, { target: { value: '' } });
    expect(passwordInput.value).toBe('');
  });
});