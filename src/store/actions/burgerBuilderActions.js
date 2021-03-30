import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

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

export const setInitialTotalPRice = () => {
  return {
    type: actionTypes.SET_INITIAL_TOTAL_PRICE,
  };
};

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients,
  };
};

export const fetchIngredientsFailed = (error) => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
    error,
  };
};

export const fetchIngredientsSucceeded = (orders) => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_SUCCEEDED,
    orders,
  };
};

export const fetchIngredients = () => {
  return (dispatch) => {
    axios
      .get("/ingredients.json")
      .then(({ data }) => {
        dispatch(setIngredients(data));
        dispatch(setInitialTotalPRice());
        dispatch(fetchIngredientsSucceeded());
      })
      .catch((error) => {
        dispatch(fetchIngredientsFailed());
        console.log(error);
      });
  };
};
