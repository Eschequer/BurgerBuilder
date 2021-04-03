import React from "react";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

function NavigationItems({ location }) {
  const isAuthenticated = useSelector((state) => state.auth.token !== null);

  return (
    <ul className={styles.NavigationItems}>
      <NavigationItem link="/" active={location.pathname === "/"}>
        Burger Builder
      </NavigationItem>
      {!isAuthenticated ? (
        <NavigationItem link="/auth" active={location.pathname === "/auth"}>
          Authentication
        </NavigationItem>
      ) : (
        <>
          <NavigationItem
            link="/orders"
            active={location.pathname === "/orders"}
          >
            Orders
          </NavigationItem>
          <NavigationItem
            link="/logout"
            active={location.pathname === "/logout"}
          >
            Logout
          </NavigationItem>
        </>
      )}
    </ul>
  );
}

export default withRouter(NavigationItems);
