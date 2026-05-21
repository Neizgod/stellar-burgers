import { TConstructorIngredient, TIngredient } from '@utils-types';
import { createSlice } from '@reduxjs/toolkit';

type TBurgerConstructorSlice = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TBurgerConstructorSlice = {
  bun: null,
  ingredients: []
};

export const BurgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredients: (state, action) => {
      if (action.payload.type === 'bun') {
        state.bun = action.payload;
        return;
      }
      const id = state.ingredients.length;
      const ingredientWithId = { ...action.payload, id };
      state.ingredients.push(ingredientWithId);
    },
    moveDown: (state, action) => {
      const [movingElement] = state.ingredients.splice(action.payload, 1);
      state.ingredients.splice(action.payload + 1, 0, movingElement);
    },
    moveUp: (state, action) => {
      const [movingElement] = state.ingredients.splice(action.payload, 1);
      state.ingredients.splice(action.payload - 1, 0, movingElement);
    },
    deleteIngredient: (state, action) => {
      state.ingredients.splice(action.payload, 1);
    },
    clearIngredients: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  },

  selectors: {
    BurgerConstructorSelector: (state) => state
  }
});

export const { BurgerConstructorSelector } = BurgerConstructorSlice.selectors;

export const {
  addIngredients,
  moveDown,
  moveUp,
  deleteIngredient,
  clearIngredients
} = BurgerConstructorSlice.actions;
