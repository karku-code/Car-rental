
import { Navigate } from 'react-router-dom';

const ProtectedAdminRoute = ({ children }) => {
  const email = localStorage.getItem('email');
  const username = localStorage.getItem('username');

  if (!email || !username) {
    return <Navigate to="/admin" />;
  }

  return children;
};

export default ProtectedAdminRoute;
