import React from "react";
import styles from "./MangaPage.module.css";

function MangaPage({ onLoginClick }) {
  return (
    <div className={styles.mangaPage}>
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search for manga by title"
          className={styles.input}
        />
        <button className={styles.button} onClick={() => onLoginClick()}>
          SignIn
        </button>
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
