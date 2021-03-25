import React from "react";
import { Link } from "react-router-dom";
import styles from "./NavigationItem.module.css";

function NavigationItem(props) {
  return (
    <li className={styles.NavigationItem}>
      <Link to={props.link} className={props.active ? styles.active : null}>
        {props.children}
      </Link>
    </li>
  );
}

export default NavigationItem;
