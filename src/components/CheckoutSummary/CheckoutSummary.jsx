import React from "react";
import styles from "./CheckoutSummary.module.css";
import Burger from "../Burger/Burger";
import Button from "../UI/Button/Button";

function CheckoutSummary(props) {
  return props.ingredients ? (
    <div className={styles.CheckoutSummary}>
      <h1>We hope you will enjoy your Burger!</h1>
      <div style={{ margin: "auto", width: "100%" }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button
        btnType="Success"
        clickHandler={props.continueCheckoutHandler}
        type="button"
      >
        CONTINUE
      </Button>
      <Button
        btnType="Danger"
        clickHandler={props.cancelCheckoutHandler}
        type="button"
      >
        CANCEL
      </Button>
    </div>
  ) : null;
}

export default CheckoutSummary;
