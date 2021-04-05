import * as actionTypes from "../actions/actionTypes";

const INGREDIENT_PRICES = {
  salad: 2,
  cheese: 5.4,
  meat: 9.8,
  bacon: 11,
};

const initialState = {
  ingredients: null,
  totalPrice: 0,
  error: false,
  building: false,
};

const burgerBuilderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
        },
        totalPrice: +(
          state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
        ).toFixed(2),
        building: true,
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
        },
        totalPrice: +(
          state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
        ).toFixed(2),
        building: true,
      };
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          salad: action.ingredients.salad,
          cheese: action.ingredients.cheese,
          bacon: action.ingredients.bacon,
          meat: action.ingredients.meat,
        },
        totalPrice: 0,
        building: false,
      };
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true,
      };
    case actionTypes.FETCH_INGREDIENTS_SUCCEEDED:
      return {
        ...state,
        error: false,
      };
    default:
      return state;
  }
};

export default burgerBuilderReducer;
