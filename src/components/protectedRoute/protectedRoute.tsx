import { useSelector } from '../../services/store';
import { userSliceSelector } from '../../services/slices/userSlice';
import { Preloader } from '@ui';
import { Navigate, useLocation } from 'react-router-dom';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const { isAuthChecked, isAuthenticated } = useSelector(userSliceSelector);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !isAuthenticated) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && isAuthenticated) {
    const from = location.state?.from || { pathname: '/' };

    return <Navigate replace to={from} />;
  }

  return children;
};
