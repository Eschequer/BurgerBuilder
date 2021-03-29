import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./containers/App";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

if (module.hot) {
  module.hot.accept();
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function deepCloneObj(obj) {
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
}
