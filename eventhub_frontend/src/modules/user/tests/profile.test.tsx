import { render, screen, fireEvent } from '@testing-library/react';
import { ProfilePage } from '../components/ProfilePage';
import { AuthProvider } from '../hooks/useAuth';
import { RegisterData } from '../models/register.model';
import { MemoryRouter } from 'react-router-dom';

const renderWithAuth = (isAuthenticated: boolean = false, userData?: RegisterData) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <MemoryRouter>
        <AuthProvider>{children}</AuthProvider>
      </MemoryRouter>
    );
  };

  const result = render(<ProfilePage />, { wrapper: Wrapper });

  if (isAuthenticated && userData) {
   
  }

  return result;
};

describe('Profile Component', () => {
  it('should display "Please login" message when user is not authenticated', () => {
    renderWithAuth();
    expect(screen.getByText('Please login to view your profile')).toBeInTheDocument();
  });

  it('should not display user information when not authenticated', () => {
    renderWithAuth();
    expect(screen.queryByTestId('profile-email')).not.toBeInTheDocument();
    expect(screen.queryByTestId('profile-username')).not.toBeInTheDocument();
  });

  it('should not display logout button when not authenticated', () => {
    renderWithAuth();
    expect(screen.queryByRole('button', { name: /logout/i })).not.toBeInTheDocument();
  });

  it('should display profile section', () => {
    renderWithAuth();
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });

  it('should display profile heading when not authenticated', () => {
    renderWithAuth();
    expect(screen.getByRole('heading', { name: /Profile/i })).toBeInTheDocument();
  });

  it('should display empty fields when not authenticated', () => {
    renderWithAuth();
    expect(screen.queryByText('ID:')).not.toBeInTheDocument();
    expect(screen.queryByText('Email:')).not.toBeInTheDocument();
    expect(screen.queryByText('Username:')).not.toBeInTheDocument();
  });

  it('should not display logout button when unauthenticated', () => {
    renderWithAuth();
    expect(screen.queryByRole('button', { name: /Se déconnecter/i })).not.toBeInTheDocument();
  });
});

