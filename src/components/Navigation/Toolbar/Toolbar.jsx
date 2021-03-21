import React from "react";
import styles from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import SidebarToggle from "../../UI/SidebarToggle/SidebarToggle";

function Toolbar(props) {
  return (
    <header className={styles.Toolbar}>
      <SidebarToggle toggleSidebar={props.toggleSidebar} />
      <Logo height="80%" />
      <nav className={styles.desktopOnly}>
        <NavigationItems />
      </nav>
    </header>
  );
}

export default Toolbar;
