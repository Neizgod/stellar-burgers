import {
  getOrderByNumberApi,
  getOrdersApi,
  orderBurgerApi,
  TNewOrder
} from '@api';
import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '@utils-types';

type TOrderState = {
  isLoading: boolean;
  isLoadingOrders: boolean;
  newOrder: null | TNewOrder;
  error: null | string;
  currentOrderData: TOrder | null;
  userOrders: TOrder[] | null;
} & TOrdersData;

const initialState: TOrderState = {
  orders: [],
  userOrders: null,
  total: 0,
  totalToday: 0,
  isLoading: false,
  isLoadingOrders: false,
  newOrder: null,
  currentOrderData: null,
  error: null
};

export const orderBurger = createAsyncThunk(
  'order/orderBurger',
  async (data: string[]) => orderBurgerApi(data)
);

export const getFeeds = createAsyncThunk('order/getFeeds', async () =>
  getFeedsApi()
);

export const getOrders = createAsyncThunk('order/getOrders', async () =>
  getOrdersApi()
);

export const getOrderByNumber = createAsyncThunk(
  'order/getOrderByNumber',
  async (number: number) => getOrderByNumberApi(number)
);

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearNewOrder: (state) => {
      state.newOrder = null;
    },
    clearUserOrders: (state) => {
      state.userOrders = null;
    },
    clearCurrentOrderData: (state) => {
      state.currentOrderData = null;
    }
  },
  selectors: {
    ordersSliceSelector: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.newOrder = null;
        state.isLoading = true;
      })
      .addCase(orderBurger.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.isLoading = false;
        state.newOrder = action.payload.order;
      })

      .addCase(getFeeds.pending, (state) => {
        state.isLoadingOrders = true;
      })
      .addCase(getFeeds.rejected, (state) => {
        state.isLoadingOrders = false;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.isLoadingOrders = false;
      })

      .addCase(getOrders.pending, (state) => {
        state.isLoadingOrders = true;
      })
      .addCase(getOrders.rejected, (state) => {
        state.isLoadingOrders = false;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.userOrders = action.payload;
        state.isLoadingOrders = false;
      })

      .addCase(getOrderByNumber.pending, (state) => {})
      .addCase(getOrderByNumber.rejected, (state) => {})
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.currentOrderData = action.payload.orders[0];
      });
  }
});

export const { clearNewOrder, clearUserOrders, clearCurrentOrderData } =
  ordersSlice.actions;
export const { ordersSliceSelector } = ordersSlice.selectors;
