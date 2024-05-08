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
      toast.error("Server Error......", {
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

  const deleteFromCart = async (data, whereToDelete) => {
    try {
      console.log(data);
      const response = await axios.patch("http://localhost:5000/deleteInCart", {
        email: userData.email,
        type: userData.type,
        whereToDelete: whereToDelete,
        _id: data._id,
      });
      console.log("request res::::", response);
      fetchUserData();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userData) {
      fetchUserData();
    }
  }, [userData]);

  const fetchColor = () => {
    const letter = "0123456789ABCDEF";
    let color1 = "#";
    let color2 = "#";
    for (let i = 0; i < 6; i++) {
      color1 += letter[Math.floor(Math.random() * 16)];
      color2 += letter[Math.floor(Math.random() * 16)];
    }
    // Adjust alpha (opacity) for color1 and color2
    const alpha1 = 0; // Adjust as needed
    const alpha2 = 0.4; // Adjust as needed
    return `linear-gradient(to bottom, rgba(${parseInt(
      color1.slice(1, 3),
      16
    )},${parseInt(color1.slice(3, 5), 16)},${parseInt(
      color1.slice(5, 7),
      16
    )},${alpha1}), rgba(${parseInt(color2.slice(1, 3), 16)},${parseInt(
      color2.slice(3, 5),
      16
    )},${parseInt(color2.slice(5, 7), 16)},${alpha2}))`;
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

      {userData ? (
        <>
          <h1 className={styles.ErrorMsg}>CART</h1>

          <p className={styles.titles}>Added Books:</p>
          <div className={styles.booksContainer}>
            {bookCart &&
              bookCart.map((book, index) => (
                <div
                  key={index}
                  className={styles.book}
                  style={{ background: fetchColor() }}
                >
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
                  <button
                    className={styles.cartIcon}
                    onClick={() => deleteFromCart(book, "bookCart")}
                  >
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
                <div
                  key={index}
                  className={styles.book}
                  style={{ background: fetchColor() }}
                >
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
                  <button
                    className={styles.cartIcon}
                    onClick={() => deleteFromCart(book, "mangaCart")}
                  >
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
