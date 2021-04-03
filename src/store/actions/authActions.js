import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSucceeded = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCEEDED,
    authData,
  };
};

export const authFailed = (error) => {
  return {
    type: actionTypes.AUTH_FAILED,
    error,
  };
};

export const authLogout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return async (dispatch) => {
    setTimeout(() => {
      dispatch(authLogout());
    }, expirationTime * 1000);
  };
};

export const auth = (email, password, isSignup) => {
  return async (dispatch) => {
    try {
      dispatch(authStart());

      const authData = {
        email,
        password,
        returnSecureToken: true,
      };

      let url = isSignup
        ? "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDcZIJzDU56AKRxq_pZ1wA1C7bricz5vAI"
        : "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDcZIJzDU56AKRxq_pZ1wA1C7bricz5vAI";

      const { data } = await axios.post(url, authData);

      dispatch(authSucceeded(data));
      dispatch(checkAuthTimeout(data.expiresIn));
    } catch (error) {
      console.log(error.response.data);
      dispatch(authFailed(error.response.data));
    }
  };
};
