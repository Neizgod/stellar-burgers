import { createSlice } from "@reduxjs/toolkit";
import { TOrdersData } from "@utils-types";

type TOrderState = {
  isLoading: boolean;
} & TOrdersData;

const initialState: TOrderState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  selectors: {
    userSliceSelector: (state) => state
  },
  })