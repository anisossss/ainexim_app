import { Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export default function PublicRoute({ component: Component, redirectTo = '/dashboard' }) {
  const { token } = useAuth()

  return token ? <Navigate to={redirectTo} /> : <Component />
}
