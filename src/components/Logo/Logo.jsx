import React from "react";
import burgerLogo from "../../assets/28.1 burger-logo.png";
import styles from "./Logo.module.css";

function Logo(props) {
  return (
    <div className={styles.Logo} style={{ height: props.height }}>
      <img src={burgerLogo} alt="Burger Logo" />
    </div>
  );
}

export default Logo;
