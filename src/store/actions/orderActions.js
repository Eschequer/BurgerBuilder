import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const purchaseBurgerSucceeded = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCEEDED,
    orderId: id,
    orderData,
  };
};

export const purchaseBurgerFailed = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAILED,
    error,
  };
};

export const startPurchasingBurger = () => {
  return {
    type: actionTypes.START_PURCHASING_BURGER,
  };
};

export const initiatePurchase = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};

export const startFetchingOrders = () => {
  return {
    type: actionTypes.FETCH_ORDERS_INIT,
  };
};

export const fetchOrdersSucceeded = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCEEDED,
    orders,
  };
};
export const fetchOrdersFailed = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAILED,
    error,
  };
};

export const fetchOrders = (token) => {
  return async (dispatch) => {
    try {
      dispatch(startFetchingOrders());
      const { data } = await axios.get("/orders.json?auth=" + token);

      const fetchedOrders = [];

      for (let key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          fetchedOrders.push({ ...data[key], id: key });
        }
      }

      dispatch(fetchOrdersSucceeded(fetchedOrders));
    } catch (error) {
      dispatch(fetchOrdersFailed(error));
    }
  };
};

export const purchaseBurger = (orderData) => {
  return async (dispatch, getState) => {
    try {
      dispatch(startPurchasingBurger());
      const { data } = await axios.post(
        "/orders.json?auth=" + getState().auth.token,
        orderData
      );

      dispatch(purchaseBurgerSucceeded(data.name, orderData));
    } catch (error) {
      console.log(error);
      dispatch(purchaseBurgerFailed(error));
    }
  };
};
