import { Navigate, Outlet } from 'react-router-dom';
import { LoadingIcon } from './components/Icons';

export default function RequireAuth({ status, token }) {
  if (status === 'loading') {
    return <LoadingIcon />;
  } else {
    const currentToken = localStorage.getItem('token');
    if (!currentToken || currentToken !== token) {
      return <Navigate to="/odinbook/login" />;
    } else {
      return <Outlet />;
    }
  }
}
