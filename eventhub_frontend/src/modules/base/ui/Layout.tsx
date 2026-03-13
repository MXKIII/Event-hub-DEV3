import React from 'react';
import { useNavigate, NavLink, Outlet, useLocation} from 'react-router-dom';
import { CssBaseline, Toolbar, Container, Typography, Box, Button } from '@mui/material';
import { useAuth } from '../../user/hooks/useAuth';
import { useTrackPageView } from '../../analytics/hooks/useTrackPageView';

export const Layout: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  useTrackPageView(location.pathname);

  

  return (
    <>
      <CssBaseline />
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider', flexDirection: 'column', alignItems: 'stretch', py: 1 }}>
  <Typography variant="h6" component="div" sx={{ textAlign: 'center', mb: 1 }}>
    {!isAuthenticated ? 'Bienvenue sur EventHub' : 'EventHub'}
  </Typography>

  <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
    {!isAuthenticated ? (
      <>
        <Button component={NavLink} to="/login" color="inherit">Se connecter</Button>
        <Button component={NavLink} to="/register" color="inherit">S'inscrire</Button>
      </>
    ) : (
      <>
        <Button component={NavLink} to="/profile" color="inherit">Mon profil</Button>
        <Button component={NavLink} to="/events" color="inherit">Événements</Button>
        <Button component={NavLink} to="/dashboard" color="inherit">Dashboard</Button>
        <Button onClick={handleLogout} color="inherit">Déconnexion</Button>
      </>
    )}
  </Box>
</Toolbar>

      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Container maxWidth="xl" sx={{ mt: 3 }}>
          <Outlet />
        </Container>
      </Box>
    </>
  );
};