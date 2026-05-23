import { TConstructorIngredient, TIngredient } from '@utils-types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

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
    addIngredients: {
      reducer: (
        state,
        action: PayloadAction<TIngredient | (TIngredient & { id: string })>
      ) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload as TIngredient;
          return;
        }
        state.ingredients.push(action.payload as TConstructorIngredient);
      },
      prepare: (ingredient: TIngredient) => {
        if (ingredient.type === 'bun') {
          return { payload: ingredient };
        }
        return { payload: { ...ingredient, id: uuidv4() } };
      }
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
