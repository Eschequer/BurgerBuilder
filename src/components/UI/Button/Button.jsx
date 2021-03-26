import React from "react";
import styles from "./Button.module.css";

function Button(props) {
  return (
    <button
      className={[styles.Button, styles[props.btnType]].join(" ")}
      onClick={props.clickHandler}
      type={props.type}
    >
      {props.children}
    </button>
  );
}

export default Button;
