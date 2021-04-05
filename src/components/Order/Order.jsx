import React from "react";
import styles from "./Order.module.css";

function Order(props) {
  function renderIngredients() {
    if (!props.ingredients) return null;
    return Object.entries(props.ingredients).map((ingredient) => {
      return (
        <span key={ingredient[0]}>
          {ingredient[0]} ({ingredient[1]})
        </span>
      );
    });
  }

  return (
    <div className={styles.Order}>
      <div style={{ fontWeight: "bold" }}>
        Ingredients:
        <p>{renderIngredients()}</p>
      </div>
      <p>
        Price: <strong>${props.price}</strong>
      </p>
      <p>Ordered by {props.customerInfo.name}</p>
    </div>
  );
}

export default Order;
