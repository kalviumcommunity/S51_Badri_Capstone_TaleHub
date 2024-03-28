import React, { useEffect } from "react";
import styles from "./landingPage.module.css"; // Import CSS module
import { useState } from "react";
import axios from "axios";
function LandingPage() {
  const [topRatedBooks, setTopRatedBooks] = useState([]);
  const [top50Manga, setTop50Manga] = useState([]);

  const getTopRatedBooks = async () => {
    try {
      const response = await axios.get(
        "https://www.googleapis.com/books/v1/volumes?q=*&orderby=rating&maxResults=40"
      );

      return response.data.items;
    } catch (error) {
      console.error("Error fetching top rated books:", error);
      return [];
    }
  };

  const getTop50Manga = async () => {
    try {
      const options = {
        method: "GET",
        url: "https://myanimelist.p.rapidapi.com/manga/top/manga",
        headers: {
          "X-RapidAPI-Key":
            "468b267b84mshe5256b2b59ee957p111078jsn666fc3a3d2fe",
          "X-RapidAPI-Host": "myanimelist.p.rapidapi.com",
        },
      };
      const response = await axios.request(options);
      console.log(response.data);
      setTop50Manga(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchTopRatedBooks = async () => {
      const books = await getTopRatedBooks();
      setTopRatedBooks(books);
    };

    fetchTopRatedBooks();
    getTop50Manga();
  }, []);

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
      </div>

      <div>
        <p className={styles.titles}>Top Rated Books:</p>
        <div className={styles.booksContainer}>
          {topRatedBooks.map((book, index) => (
            <div key={index} className={styles.book}>
              {book.volumeInfo.imageLinks && (
                <img
                  src={book.volumeInfo.imageLinks.thumbnail}
                  alt="Thumbnail"
                />
              )}{" "}
              <h3>{book.volumeInfo.title}</h3>
              {book.volumeInfo.subtitle && (
                <p>
                  <strong>Subtitle:</strong> {book.volumeInfo.subtitle}
                </p>
              )}
              {book.volumeInfo.authors && (
                <p className={styles.auth}>
                  <strong>Author(s):</strong>
                  {book.volumeInfo.authors.join(", ")}
                </p>
              )}
            </div>
          ))}
        </div>

        <p className={styles.titles}>Top 50 Manga:</p>
        <div className={styles.booksContainer}>
          {top50Manga &&
            top50Manga.map((book, index) => (
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
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
