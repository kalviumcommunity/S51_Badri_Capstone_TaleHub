import React from "react";
import styles from "./MangaPage.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function MangaPage({ onLoginClick, userData, setUserData }) {
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
    <div className={styles.mangaPage}>
      <ToastContainer />

      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search for manga by title"
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

      <div className={styles.genre}>
        <div className={styles.book1}>
          <p className={styles.catogories}>Manga</p>
        </div>
        <div className={styles.book2}>
          <p className={styles.catogories}>Manhwa</p>
        </div>
        <div className={styles.book3}>
          <p className={styles.catogories}>Manhua</p>
        </div>
        <div className={styles.book4}>
          <p className={styles.catogories}>Oneshot</p>
        </div>
        <div className={styles.book5}>
          <p className={styles.catogories}>Doujinshi</p>
        </div>
        <div className={styles.book6}>
          <p className={styles.catogories}>Light Novel</p>
        </div>
        <div className={styles.book7}>
          <p className={styles.catogories}>Novel</p>
        </div>
      </div>
    </div>
  );
}

export default MangaPage;
