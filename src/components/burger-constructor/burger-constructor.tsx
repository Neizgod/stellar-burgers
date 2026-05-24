import { FC, useEffect, useMemo, useState } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  BurgerConstructorSelector,
  clearIngredients
} from '../../services/slices/burgerConstructorSlice';
import { useDispatch, useSelector } from '../../services/store';
import { userSliceSelector } from '../../services/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import {
  clearNewOrder,
  orderBurger,
  ordersSliceSelector
} from '../../services/slices/ordersSlice';
import { TNewOrder } from '@api';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector(BurgerConstructorSelector);
  const orderData = useSelector(ordersSliceSelector);
  const { isAuthenticated } = useSelector(userSliceSelector);

  const [orderInfo, setOrderInfo] = useState<{
    orderRequest: boolean;
    orderModalData: null | TNewOrder;
  }>({
    orderRequest: false,
    orderModalData: null
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setOrderInfo({
      orderRequest: orderData.isLoading,
      orderModalData: orderData.newOrder
    });
  }, [orderData]);

  const onOrderClick = () => {
    // if (!constructorItems.bun || orderRequest) return;
    if (!constructorItems.bun) return;
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    const data = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id),
      constructorItems.bun._id
    ];

    dispatch(orderBurger(data));
  };

  const closeOrderModal = () => {
    dispatch(clearNewOrder());
    if (!orderInfo.orderRequest) dispatch(clearIngredients());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderInfo.orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderInfo.orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
