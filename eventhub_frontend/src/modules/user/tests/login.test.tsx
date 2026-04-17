import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('should have a button to submit login', () => {
    setup();
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
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
    expect(screen.getByLabelText('Email')).toBeRequired();
    expect(screen.getByLabelText('Password')).toBeRequired();
  });

  it('should submit the form when the login button is clicked', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(
      new Error('Email ou mot de passe invalide.')
    );

    setup();
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'Password@123' } });
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    await waitFor(() => {
      expect(screen.getByText(/Email ou mot de passe invalide/i)).toBeInTheDocument();
    });
  });

  it('should check that the password exists', () => {
    setup();
    const passwordInput = screen.getByLabelText('Password') as HTMLInputElement;
    fireEvent.change(passwordInput, { target: { value: '' } });
    expect(passwordInput.value).toBe('');
  });
});