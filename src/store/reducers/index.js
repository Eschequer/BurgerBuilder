import { combineReducers } from "redux";
import ingredientsReducer from "./ingredientsReducer";
import totalPriceReducer from "./totalPriceReducer";

export default combineReducers({
  ingredients: ingredientsReducer,
  totalPrice: totalPriceReducer,
});
