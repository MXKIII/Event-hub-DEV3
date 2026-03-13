import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './modules/user/hooks/useAuth'
import { Layout } from './modules/base/ui/Layout'
import { LoginForm } from './modules/user/components/LoginForm'
import { RegisterForm } from './modules/user/components/RegisterForm'
import { ProfilePage } from './modules/user/components/ProfilePage'
import ProtectedRoute from './modules/app/components/ProtectedRoute'
import AnalyticsDashboard from './modules/dashboard/ui/AnalyticsDashboard'
import { lazy, Suspense } from 'react'
import { Center, Spinner } from '@chakra-ui/react'

const EventsPage = lazy(() => import('./modules/event/ui/EventsPage'));

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="login" element={<LoginForm />} />
            <Route path="register" element={<RegisterForm />} />
            <Route element={<ProtectedRoute />}>
              <Route path="profile" element={<ProfilePage />} />
              <Route path="dashboard" element={<AnalyticsDashboard />} />
              <Route path="events" element={
                <Suspense fallback={<Center py={20}><Spinner size={"xl"} /></Center>}>
                  <EventsPage />
                </Suspense>
              } />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
