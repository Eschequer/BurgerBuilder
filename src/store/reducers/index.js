import { combineReducers } from "redux";
import burgerBuilderReducer from "./BurgerBuilderReducer";
import orderReducer from "./orderReducer";
import authReducer from "./authReducer";

export default combineReducers({
  burgerBuilder: burgerBuilderReducer,
  orders: orderReducer,
  auth: authReducer,
});
