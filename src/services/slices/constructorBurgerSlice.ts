import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

type TConstructorBurgerSlice = {
  isLoading: boolean;
  data: TIngredient[];
  error: string | null;
};

const initialState: TConstructorBurgerSlice = {
  isLoading: false,
  data: [],
  error: null
};

export const getIngredients = createAsyncThunk(
  'constructor/getIngredients',
  async () => getIngredientsApi()
);

export const constructorBurgerSlice = createSlice({
  name: 'constructorBurger',
  initialState,
  reducers: {},
  selectors: {
    constructorBurgerStateSelector: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state) => {
        state.isLoading = false;
        state.error = 'Произошла ошибка при запросе ингредиентов';
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      });
  }
});

export const { constructorBurgerStateSelector } =
  constructorBurgerSlice.selectors;
