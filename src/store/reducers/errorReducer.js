import * as actionTypes from "../actions/actionTypes";

const ingredientsReducer = (state = false, action) => {
  switch (action.type) {
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return true;
    case actionTypes.FETCH_INGREDIENTS_SUCCEEDED:
      return false;
    default:
      return state;
  }
};

export default ingredientsReducer;
