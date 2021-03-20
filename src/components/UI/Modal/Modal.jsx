import ReactDom from "react-dom";
import styles from "./Modal.module.css";
import React from "react";
import Backdrop from "../Backdrop/Backdrop";

const modal = document.querySelector("#modal-root");

function Modal(props) {
  return ReactDom.createPortal(
    <React.Fragment>
      <Backdrop show={props.show} cancelOrder={props.cancelOrder} />
      <div
        className={styles.Modal}
        style={{
          transform: props.show ? "translateY(0)" : "translateY(-100vh)",
          opacity: props.show ? 1 : 0,
        }}
      >
        {props.children}
      </div>
    </React.Fragment>,
    modal
  );
}

export default Modal;
