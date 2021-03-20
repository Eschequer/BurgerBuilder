import React from "react";
import styles from "./Backdrop.module.css";

function Backdrop(props) {
  if (!props.show) return null;

  return <div className={styles.Backdrop} onClick={props.cancelOrder} />;
}

export default Backdrop;
