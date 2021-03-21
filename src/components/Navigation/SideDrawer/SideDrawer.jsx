import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import styles from "./SideDrawer.module.css";
import Backdrop from "../../UI/Backdrop/Backdrop";

function SideDrawer(props) {
  return (
    <React.Fragment>
      <Backdrop show={props.open} cancel={props.close} />
      <div
        className={
          styles.SideDrawer + ` ${props.open ? styles.open : styles.close}`
        }
      >
        <Logo height="7%" />
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </React.Fragment>
  );
}

export default SideDrawer;
