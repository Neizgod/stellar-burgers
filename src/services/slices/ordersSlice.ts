import { orderBurgerApi, TNewOrder } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '@utils-types';

type TOrderState = {
  isLoading: boolean;
  newOrder: null | TNewOrder;
  error: null | string;
} & TOrdersData;

const initialState: TOrderState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  newOrder: null,
  error: null
};

export const orderBurger = createAsyncThunk(
  'order/orderBurger',
  async (data: string[]) => orderBurgerApi(data)
);

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearNewOrder: (state) => {
      state.newOrder = null;
    }
  },
  selectors: {
    ordersSliceSelector: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(orderBurger.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.newOrder = action.payload.order;
        state.isLoading = false;
      });
  }
});

export const { clearNewOrder } = ordersSlice.actions;
export const { ordersSliceSelector } = ordersSlice.selectors;
