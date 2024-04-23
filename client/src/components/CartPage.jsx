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
      setMangaCart(response.data.mangaCart);
      setBookCart(response.data.bookCart);
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
        <>
          <h1 className={styles.ErrorMsg}>CART</h1>

          <p className={styles.titles}>Added Books:</p>
          <div className={styles.booksContainer}>
            {bookCart &&
              bookCart.map((book, index) => (
                <div key={index} className={styles.book}>
                  {book && book.thumbnail && (
                    <img src={book.thumbnail} alt="Thumbnail" />
                  )}{" "}
                  <h3>{book && book.title}</h3>
                  {book.subtitle && (
                    <p>
                      <strong>Subtitle:</strong> {book.subtitle}
                    </p>
                  )}
                  {book && book.authors && (
                    <p className={styles.auth}>
                      <strong>Author(s):</strong>
                      {book.authors.join(", ")}
                    </p>
                  )}
                  <button className={styles.cartIcon}>
                    <lord-icon
                      src="https://cdn.lordicon.com/wpyrrmcq.json"
                      trigger="hover"
                      colors="primary:#ffffff"
                      style={{ width: "50px", height: "40px" }}
                    ></lord-icon>
                  </button>
                </div>
              ))}
          </div>
          <p className={styles.titles}>Added Books:</p>
          <div className={styles.booksContainer}>
            {mangaCart &&
              mangaCart.map((book, index) => (
                <div key={index} className={styles.book}>
                  {book.picture_url && (
                    <a href={book.myanimelist_url} target="_blank">
                      <img src={book.picture_url} alt="Thumbnail" />
                    </a>
                  )}
                  <h3>{book.title}</h3>
                  <p>
                    <b>Rating: </b>
                    {book.score}
                  </p>
                  <p>
                    <b>Rank:</b> {book.rank}
                  </p>
                  <button className={styles.cartIcon}>
                    <lord-icon
                      src="https://cdn.lordicon.com/wpyrrmcq.json"
                      trigger="hover"
                      colors="primary:#ffffff"
                      style={{ width: "50px", height: "40px" }}
                    ></lord-icon>
                  </button>
                </div>
              ))}
          </div>
        </>
      ) : (
        <h1 className={styles.ErrorMsg}>Login to use cart feature</h1>
      )}
    </div>
  );
}

export default CartPage;
