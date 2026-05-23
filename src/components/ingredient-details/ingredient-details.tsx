import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useDispatch, useSelector } from '../../services/store';
import {
  getIngredients,
  ingredientsStateSelector
} from '../../services/slices/ingredientsSlice';
import { useParams, useLocation } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { data, isLoading } = useSelector(ingredientsStateSelector);
  useEffect(() => {
    if (data.length === 0 && !isLoading) {
      dispatch(getIngredients());
    }
  }, []);
  const ingredientData = data.find((item) => item._id === id);

  const location = useLocation();
  const isInModal = location.state ? true : false;

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} isInModal={isInModal}/>;
};
