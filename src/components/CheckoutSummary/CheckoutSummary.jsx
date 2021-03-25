import React from "react";
import styles from "./CheckoutSummary.module.css";
import Burger from "../Burger/Burger";
import Button from "../UI/Button/Button";

function CheckoutSummary(props) {
  return (
    <div className={styles.CheckoutSummary}>
      <h1>We hope you will enjoy your Burger!</h1>
      <div style={{ margin: "auto", width: "100%" }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType="Success">CONTINUE</Button>
      <Button btnType="Danger" clickHandler={props.cancelCheckoutHandler}>
        CANCEL
      </Button>
    </div>
  );
}

export default CheckoutSummary;
