import React from "react";
import { withRouter } from "react-router-dom";
import styles from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

function NavigationItems({ location }) {
  return (
    <ul className={styles.NavigationItems}>
      <NavigationItem link="/" active={location.pathname === "/"}>
        Burger Builder
      </NavigationItem>
      <NavigationItem
        link="/checkout"
        active={location.pathname === "/checkout"}
      >
        Checkout
      </NavigationItem>
    </ul>
  );
}

export default withRouter(NavigationItems);
