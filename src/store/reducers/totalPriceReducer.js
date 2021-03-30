import * as actionTypes from "../actions/actionTypes";

const INGREDIENT_PRICES = {
  salad: 2,
  cheese: 5.4,
  meat: 9.8,
  bacon: 11,
};

const ingredientsReducer = (state = 0, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_TOTAL_PRICE:
      return +(state + INGREDIENT_PRICES[action.ingredientName]).toFixed(2);
    case actionTypes.SUBTRACT_FROM_TOTAL__PRICE:
      return +(state - INGREDIENT_PRICES[action.ingredientName]).toFixed(2);
    case actionTypes.SET_INITIAL_TOTAL_PRICE:
      return 0;
    default:
      return state;
  }
};

export default ingredientsReducer;
