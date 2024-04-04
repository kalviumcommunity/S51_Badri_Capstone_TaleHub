import React from "react";
import styles from "./BooksPage.module.css";

function BooksPage({ onLoginClick }) {
  return (
    <div className={styles.booksPage}>
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search for books by title, author, etc..."
          className={styles.input}
        />
        <button className={styles.button} onClick={() => onLoginClick()}>
          SignIn
        </button>
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
