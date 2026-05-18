import { TIngredient } from '@utils-types';
import { createSlice } from '@reduxjs/toolkit';

type TBurgerConstructorSlice = {
  bun: {
    _id: '';
  };
  ingredients: TIngredient[];
};

const initialState: TBurgerConstructorSlice = {
  bun: {
    _id: ''
  },
  ingredients: []
};

export const BurgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredients: (state, action) => {
      if (action.payload.type === 'bun') {
        state.bun._id = action.payload._id;
        return;
      }
      state.ingredients.push(action.payload);
    }
  },
  selectors: {
    BurgerConstructorSelector: (state) => state
  }
});

export const { BurgerConstructorSelector } = BurgerConstructorSlice.selectors;

export const { addIngredients } = BurgerConstructorSlice.actions;
