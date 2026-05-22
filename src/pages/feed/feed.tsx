import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getFeeds,
  getOrders,
  ordersSliceSelector
} from '../../services/slices/ordersSlice';
import {
  getIngredients,
  ingredientsStateSelector
} from '../../services/slices/ingredientsSlice';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const { orders, isLoadingOrders } = useSelector(ordersSliceSelector);
  const { isLoading, data } = useSelector(ingredientsStateSelector);
  const isLoadingIngredients = isLoading;
  const ingredients = data;

  useEffect(() => {
    if (orders.length === 0) dispatch(getFeeds());
  }, []);

  useEffect(() => {
    if (ingredients.length === 0) dispatch(getIngredients());
  }, []);
  // const orders: TOrder[] = [];

  if (isLoadingOrders || isLoadingIngredients) {
    return <Preloader />;
  }
  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(getFeeds());
      }}
    />
  );
};
