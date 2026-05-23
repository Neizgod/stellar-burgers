import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  ordersSliceSelector,
  getOrders
} from '../../services/slices/ordersSlice';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const orders = useSelector(ordersSliceSelector).userOrders;
  useEffect(() => {
    dispatch(getOrders());
  }, []);

  if (!orders) return <Preloader />;

  // const orders: TOrder[] = [];

  return <ProfileOrdersUI orders={orders} />;
};
