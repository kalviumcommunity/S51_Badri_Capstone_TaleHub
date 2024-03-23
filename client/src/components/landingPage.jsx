import React from "react";
import styles from "./landingPage.module.css"; // Import CSS module

function LandingPage() {
  return (
    <div className={styles.landingPage}>
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search by name, author, genre and etc..."
          className={styles.input}
        />
        <button>SignIn</button>
      </div>
      <div className={styles.genre}>
        <div className={styles.d1}>
          <p className={styles.categories}>Top 50 Manga</p>
        </div>
        <div className={styles.d2}>
          <p className={styles.categories}>Top 50 Manhwa</p>
        </div>
        <div className={styles.d3}>
          <p className={styles.categories}>Latest Books</p>
        </div>
        <div className={styles.d4}>
          <p className={styles.categories}>Top Rated Books</p>
        </div>
        <div className={styles.d5}>
          <p className={styles.categories}>
            Most Popular <br /> Manga's
          </p>
        </div>
        <div className={styles.d6}>
          <p className={styles.categories}>
            Most Favorite <br />
            Manga's
          </p>
        </div>
        <div className={styles.d7}>
          <p className={styles.categories}>Vintage Books</p>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
