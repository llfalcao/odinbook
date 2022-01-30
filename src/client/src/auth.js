import { Navigate, Outlet } from 'react-router-dom';

export default function RequireAuth({ token }) {
  const currentToken = localStorage.getItem('token');
  if (currentToken !== token) return <Navigate to="/odinbook/login" />;
  return <Outlet />;
}
