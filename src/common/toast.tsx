import React,{ useEffect } from "react";
import {useToast,toastMessage} from "./store";
import styles from "../styles/toast.module.css";


const Toast = () => {
  const [toast] = useToast();

  useEffect(() => {
    let timeOut:any;
    if (toast) {
      timeOut = setTimeout(() => toastMessage.next(null), 3000);
    }
    return () => {
      clearTimeout(timeOut);
    };
  }, [toast]);
  return (
    <div
      className={styles.toastWrapper}
      style={{
        opacity: toast ? 1 : 0,
        transform: toast ? "translateX(0)" : "translateX(-100vh)",
        transition: "all 0.5s ease-out",
      }}
    >
      {toast}
    </div>
  );
};

export default Toast;