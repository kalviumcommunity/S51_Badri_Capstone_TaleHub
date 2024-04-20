import React, { useEffect, useState } from "react";
import styles from "./cart.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function CartPage({ onLoginClick, userData, setUserData }) {
  const [mangaCart, setMangaCart] = useState(null);
  const [bookCart, setBookCart] = useState(null);

  const logout = () => {
    localStorage.clear();
    setUserData(null);
    setMangaCart(null);
    setBookCart(null);
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

  const fetchUserData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/getUser", {
        params: {
          email: userData.email,
          type: userData.type,
        },
      });
      console.log("Login successful:", response);
      setMangaCart(response.data.mangaCart)
      setBookCart(response.data.bookCart)
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Error while getting cart items", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  useEffect(() => {
    if (userData) {
      fetchUserData();
    }
  }, [userData]);

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

      {userData ? (
        <h1>Main Display</h1>
      ) : (
        <h1 className={styles.ErrorMsg}>Login to use cart feature</h1>
      )}
    </div>
  );
}

export default CartPage;
