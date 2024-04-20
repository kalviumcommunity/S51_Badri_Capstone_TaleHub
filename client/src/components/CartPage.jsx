import React from "react";
import styles from "./cart.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function CartPage({ onLoginClick, userData, setUserData }) {
  const logout = () => {
    localStorage.clear();
    setUserData(null);
    toast.success("Log-Out successful", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  return (
    <div className={styles.CartPage}>
      <ToastContainer />
      {userData ? (
        <button onClick={logout} className={styles.login}>
          Log-Out
        </button>
      ) : (
        <button onClick={() => onLoginClick()} className={styles.login}>
          Log-In
        </button>
      )}

      {userData ? <h1>Main Display</h1> : <h1 className={styles.ErrorMsg}>Login to use cart feature</h1>}
    </div>
  );
}

export default CartPage;
