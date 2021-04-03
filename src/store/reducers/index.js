import { combineReducers } from "redux";
import ingredientsReducer from "./ingredientsReducer";
import totalPriceReducer from "./totalPriceReducer";
import errorReducer from "./errorReducer";
import orderReducer from "./orderReducer";
import authReducer from "./authReducer";

export default combineReducers({
  ingredients: ingredientsReducer,
  totalPrice: totalPriceReducer,
  error: errorReducer,
  orders: orderReducer,
  auth: authReducer,
});
