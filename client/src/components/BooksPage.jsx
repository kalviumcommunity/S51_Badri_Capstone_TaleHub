import React from "react";
import styles from "./BooksPage.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function BooksPage({ onLoginClick, userData, setUserData }) {
  const logout = () => {
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
    <div className={styles.booksPage}>
      <ToastContainer />

      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search for books by title, author, etc..."
          className={styles.input}
        />
        {userData ? (
          <button onClick={logout} className={styles.login}>
            Log-Out
          </button>
        ) : (
          <button onClick={() => onLoginClick()} className={styles.login}>
            Log-In
          </button>
        )}
      </div>

      <div className={styles.genres}>
        <div className={styles.book1}>
          <p className={styles.categories}>
            Fictional <br />
            Books
          </p>
        </div>
        <div className={styles.book2}>
          <p className={styles.categories}>
            Suspense <br />
            Books
          </p>
        </div>
        <div className={styles.book3}>
          <p className={styles.categories}>
            Fantasy <br />
            Books
          </p>
        </div>
        <div className={styles.book4}>
          <p className={styles.categories}>
            Romance <br />
            Books
          </p>
        </div>
        <div className={styles.book5}>
          <p className={styles.categories}>
            Poetry <br />
            Books
          </p>
        </div>
        <div className={styles.book6}>
          <p className={styles.categories}>
            Horror <br />
            Books
          </p>
        </div>
      </div>
    </div>
  );
}

export default BooksPage;
