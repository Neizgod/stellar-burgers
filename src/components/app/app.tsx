import {
  ConstructorPage,
  Feed,
  Login,
  NotFound404,
  Profile,
  Register
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, Modal, IngredientDetails, OrderInfo } from '@components';
import { Preloader } from '@ui';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { getIngredients, ingredientsStateSelector } from '../../services/slices/ingredientsSlice';
import { useEffect } from 'react';
import { authUser, userSliceSelector } from '../../services/slices/userSlice';
import { ProtectedRoute } from '../protectedRoute/protectedRoute';

const App = () => {
  /** TODO: взять переменные из стора */

  // const isIngredientsLoading = false;
  // const ingredients = useSelector(ingredientsStateSelector);
  // const error = null;
  const navigate = useNavigate();
  const location = useLocation();
  const backgroundLocation = location.state?.background;
  const dispatch = useDispatch();

  const { isAuthenticated, isAuthChecked, loginUserRequest } =
    useSelector(userSliceSelector);
    const { isLoading, data } = useSelector(ingredientsStateSelector);

  useEffect(() => {
    if (isAuthChecked || isAuthenticated || loginUserRequest) return;
    dispatch(authUser());
  }, []);

    useEffect(() => {
      if (data.length === 0 && !isLoading) {
        dispatch(getIngredients());
      }
    }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <OrderInfo />
            </ProtectedRoute>
          }
        />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
      {backgroundLocation && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal title={'Детали ингредиента'} onClose={() => navigate(-1)}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <Modal title={''} onClose={() => navigate(-1)}>
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
          <Route
            path='/feed/:number'
            element={
              <Modal
                title={`#${location.pathname.split('/').pop()!}`}
                onClose={() => navigate(-1)}
              >
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>

    // <div className={styles.app}>
    //   <AppHeader />
    //   {isIngredientsLoading ? (
    //     <Preloader />
    //   ) : error ? (
    //     <div className={`${styles.error} text text_type_main-medium pt-4`}>
    //       {error}
    //     </div>
    //   ) : ingredients.length > 0 ? (
    //     <ConstructorPage />
    //   ) : (
    //     <div className={`${styles.title} text text_type_main-medium pt-4`}>
    //       Нет игредиентов
    //     </div>
    //   )}
    // </div>
  );
};

export default App;
