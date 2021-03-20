import React from "react";
import styles from "./OrderSummary.module.css";
import Button from "../../UI/Button/Button";

function OrderSummary(props) {
  function renderIngredientsList() {
    return Object.keys(props.ingredients).map((ingredient, index) => {
      return (
        <li key={ingredient + index}>
          <span style={{ textTransform: "capitalize" }}>{ingredient}</span>:{" "}
          {props.ingredients[ingredient]}
        </li>
      );
    });
  }

  return (
    <React.Fragment>
      <h3>Your Order!</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul className={styles.list}>{renderIngredientsList()}</ul>
      <p>
        <strong> Total Price: {props.totalPrice}</strong>
      </p>
      <p>Ready to Checkout?</p>
      <Button btnType="Success" clickHandler={props.continueOrder}>
        CONTINUE
      </Button>
      <Button btnType="Danger" clickHandler={props.cancelOrder}>
        CANCEL
      </Button>
    </React.Fragment>
  );
}

export default OrderSummary;
