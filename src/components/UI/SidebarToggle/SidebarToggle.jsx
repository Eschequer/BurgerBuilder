import React from "react";
import styles from "./SidebarToggle.module.css";

function SidebarToggle(props) {
  return (
    <div className={styles.SidebarToggle} onClick={props.toggleSidebar}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default SidebarToggle;
