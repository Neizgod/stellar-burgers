import { useSelector } from '../../services/store';
import { userSliceSelector } from '../../services/slices/userSlice';
import { Preloader } from '@ui';
import { Navigate, useLocation } from 'react-router-dom';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({ onlyUnAuth, children }: ProtectedRouteProps) => {
  const {isAuthChecked, isAuthenticated} = useSelector(userSliceSelector);
   const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

    if (!onlyUnAuth && !isAuthenticated) {
    return <Navigate replace to='/login'/>;
  }

    if (onlyUnAuth && isAuthenticated) { //  если маршрут для неавторизованного пользователя, но пользователь авторизован 
        // при обратном редиректе  получаем данные о месте назначения редиректа из объекта location.state
        // в случае если объекта location.state?.from нет — а такое может быть , если мы зашли на страницу логина по прямому URL
        // мы сами создаём объект c указанием адреса и делаем переадресацию на главную страницу
        const from  = location.state?.from || { pathname: '/' };

        return <Navigate replace to={from} />;
  }

  return children;
};
