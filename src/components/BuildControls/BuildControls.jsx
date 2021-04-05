import React from "react";
import styles from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Cheese", type: "cheese" },
  { label: "Bacon", type: "bacon" },
  { label: "Meat", type: "meat" },
];

function BuildControls(props) {
  function renderControls() {
    return controls.map((control) => (
      <BuildControl
        label={control.label}
        key={control.label}
        addIngredientAndPrice={() => {
          props.ingredientAdded(control.type);
        }}
        removeIngredientAndPrice={() => {
          props.ingredientsRemoved(control.type);
        }}
        disable={props.disabledInfo[control.type]}
      />
    ));
  }

  return (
    <div className={styles.BuildControls}>
      <p>
        Current Price: <strong>{props.price}</strong>
      </p>
      {renderControls()}
      {!props.isAuthenticated ? (
        <button
          className={styles.OrderButton}
          disabled={props.isAuthenticated}
          onClick={props.order}
        >
          Sign in to Order
        </button>
      ) : (
        <button
          className={styles.OrderButton}
          disabled={!props.purchasable}
          onClick={props.order}
        >
          Order Now
        </button>
      )}
    </div>
  );
}

export default BuildControls;
