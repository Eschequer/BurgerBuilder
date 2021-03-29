import * as actionTypes from "./actionTypes";

export const addIngredient = (ingredientName) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName,
  };
};

export const removeIngredient = (ingredientName) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName,
  };
};

export const addToTotalPrice = (ingredientName) => {
  return {
    type: actionTypes.ADD_TO_TOTAL_PRICE,
    ingredientName,
  };
};

export const subtractFromTotalPRice = (ingredientName) => {
  return {
    type: actionTypes.SUBTRACT_FROM_TOTAL__PRICE,
    ingredientName,
  };
};
