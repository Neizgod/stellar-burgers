import { TNewOrder } from '@api';
import { TOrder } from '@utils-types';

export type BurgerConstructorUIProps = {
  constructorItems: any;
  orderRequest: boolean;
  price: number;
  orderModalData: TNewOrder | null;
  onOrderClick: () => void;
  closeOrderModal: () => void;
};
