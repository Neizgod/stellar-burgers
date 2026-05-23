import { useDispatch, useSelector } from '../../services/store';

import styles from './constructor-page.module.css';

import { BurgerIngredients } from '../../components';
import { BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';
import { FC, useEffect } from 'react';
import {
  ingredientsStateSelector,
  getIngredients
} from '../../services/slices/ingredientsSlice';

export const ConstructorPage: FC = () => {
  // const dispatch = useDispatch();
  const { isLoading, data, error } = useSelector(ingredientsStateSelector);

  // useEffect(() => {
  //   if (data.length === 0 && !isLoading) {
  //     dispatch(getIngredients());
  //   }
  // }, []);

  if (isLoading) return <Preloader />;
  if (error)
    return (
      <div className={`${styles.error} text text_type_main-medium pt-4`}>
        {error}
      </div>
    );

  if (data.length === 0) {
    return (
      <div className={`${styles.title} text text_type_main-medium pt-4`}>
        Нет игредиентов
      </div>
    );
  }

  return (
    <main className={styles.containerMain}>
      <h1
        className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
      >
        Соберите бургер
      </h1>
      <div className={`${styles.main} pl-5 pr-5`}>
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
    </main>
  );
};
