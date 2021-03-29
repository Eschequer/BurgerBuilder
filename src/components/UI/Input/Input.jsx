import React from "react";
import styles from "./Input.module.css";

function Input(props) {
  let inputElement = null;
  const inputClasses = [styles.InputElement];

  if (props.invalid === false && props.touched) {
    inputClasses.push(styles.invalid);
  }

  /*if (!props.invalid && inputClasses.includes(styles.invalid)) {
    inputClasses.pop();
  }*/

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          {...props.elementConfig}
          className={inputClasses.join(" ")}
          value={props.value}
          onChange={props.changeHandler}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          {...props.elementConfig}
          className={inputClasses.join(" ")}
          value={props.value}
          onChange={props.changeHandler}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          {...props.elementConfig}
          className={inputClasses}
          value={props.value}
          onChange={props.changeHandler}
        >
          {props.elementConfig.options.map(({ value, displayValue }) => (
            <option key={value} value={value}>
              {displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          type="text"
          {...props.elementConfig}
          className={styles.InputElement}
          onChange={props.changeHandler}
          value={props.value}
        />
      );
      break;
  }

  return (
    <div className={styles.Input}>
      <label htmlFor={props.elementConfig.id}>
        {props.elementConfig.label}
      </label>
      {inputElement}
    </div>
  );
}

export default Input;
