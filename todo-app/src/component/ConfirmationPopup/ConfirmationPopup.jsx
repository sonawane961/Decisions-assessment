import React, { useEffect, useRef } from "react";
import styles from "./ConfirmationPopup.module.scss";

const ConfirmationPopup = ({ open, message, onConfirm, onCancel }) => {
  if (!open) return null;
  const popupRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        onCancel();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupBox} ref={popupRef}>
        <p className={styles.popupMessage}>{message}</p>

        <div className={styles.popupActions}>
          <button className={styles.cancelBtn} onClick={onCancel}>
            Cancel
          </button>

          <button className={styles.confirmBtn} onClick={onConfirm}>
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
