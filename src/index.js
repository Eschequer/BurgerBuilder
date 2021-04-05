import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom";
import reducer from "./store/reducers/index";
import "./index.css";

import App from "./containers/App";

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

if (module.hot) {
  module.hot.accept();
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*function deepCloneObj(obj) {
  const clonedObj = {};

  for (let key in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key)) {
      console.log(typeof obj[key], key);
      if (typeof obj[key] === "object") {
        if (Object.prototype.toString.call(obj[key]) === "[object Array]") {
          clonedObj[key] = Object.values(deepCloneObj(obj[key]));
          continue;
        }
        clonedObj[key] = deepCloneObj(obj[key]);
        continue;
      }

      clonedObj[key] = obj[key];
    }
  }

  return clonedObj;
}*/
