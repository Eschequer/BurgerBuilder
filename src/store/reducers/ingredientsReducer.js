import * as actionTypes from "../actions/actionTypes";

const initialState = {
  salad: 0,
  cheese: 0,
  bacon: 0,
  meat: 0,
};

const ingredientsReducer = (state = initialState, action) => {
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
    default:
      return state;
  }
};

export default ingredientsReducer;
