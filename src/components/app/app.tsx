import { ConstructorPage, Feed } from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, Modal, IngredientDetails } from '@components';
import { Preloader } from '@ui';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { ingredientsStateSelector } from '../../services/slices/ingredientsSlice';

const App = () => {
  /** TODO: взять переменные из стора */

  const isIngredientsLoading = false;
  const ingredients = useSelector(ingredientsStateSelector);
  const error = null;

  const navigate = useNavigate();
  const location = useLocation();
  const backgroundLocation = location.state?.background;

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
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
