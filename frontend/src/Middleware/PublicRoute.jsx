
import { Navigate } from 'react-router-dom';
import { getSessionToken, getSessionUser } from '../Components/authentication';

function PublicRoute({ children }) {
  const user = getSessionUser();
  const token = getSessionToken();

  if (user && token) {
    return <Navigate to='/' replace />;
  }
  return children;
}

export default PublicRoute;
