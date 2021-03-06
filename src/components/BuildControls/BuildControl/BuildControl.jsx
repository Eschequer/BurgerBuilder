import React from "react";
import styles from "./BuildControl.module.css";

function BuildControl(props) {
  return (
    <div className={styles.BuildControl}>
      <div className={styles.Label}>{props.label}</div>
      <button
        className={styles.Less}
        onClick={props.removeIngredientAndPrice}
        disabled={props.disable}
      >
        Less
      </button>
      <button className={styles.More} onClick={props.addIngredientAndPrice}>
        More
      </button>
    </div>
  );
}

export default BuildControl;
