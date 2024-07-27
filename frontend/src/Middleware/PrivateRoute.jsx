
import { Navigate } from 'react-router-dom';
import { getSessionToken, getSessionUser } from '../Components/authentication';

function PrivateRoute({ children }) {
  const user = getSessionUser();
  const token = getSessionToken();

  if (!user && !token) {
    return <Navigate to='/login' replace />;
  }
  return children;
}

export default PrivateRoute;
