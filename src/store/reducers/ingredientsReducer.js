import * as actionTypes from "../actions/actionTypes";

const ingredientsReducer = (state = null, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        [action.ingredientName]: state[action.ingredientName] + 1,
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        [action.ingredientName]: state[action.ingredientName] - 1,
      };
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        salad: action.ingredients.salad,
        cheese: action.ingredients.cheese,
        bacon: action.ingredients.bacon,
        meat: action.ingredients.meat,
      };
    default:
      return state;
  }
};

export default ingredientsReducer;
