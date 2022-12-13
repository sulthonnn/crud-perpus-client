import React from "react";
import styles from "./DeleteModal.module.css";

const DeleteModal = ({ show, onDelete }) => {
  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalContainer}>
        <div className={styles.titleCloseBtn}>
          <button
            onClick={() => {
              show(false);
            }}
          >
            X
          </button>
        </div>
        <div className={styles.title}>
          <h1>Are You Sure You Want to Delete?</h1>
        </div>
        <div className={styles.footer}>
          <button
            onClick={() => {
              show(false);
            }}
            id={styles.cancelBtn}
          >
            Cancel
          </button>
          <button onClick={onDelete}>Continue</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
