import React, { useEffect } from "react";
import styles from "./landingPage.module.css"; // Import CSS module
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

function LandingPage({ onLoginClick, userData, setUserData }) {
  const [topRatedBooks, setTopRatedBooks] = useState([]);
  const [top50Manga, setTop50Manga] = useState([]);
  const [top50Manhwa, setTop50Manhwa] = useState([]);
  const [mostPopularManga, setMostPopularManga] = useState([]);
  const [mostFavoriteManga, setMostFavoriteManga] = useState([]);

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

  const addToCart = async (data, whereToAdd) => {
    try {
      if (whereToAdd == "bookCart") {
        const dataToAdd = {
          title: data.volumeInfo.title,
          subtitle: data.volumeInfo.subtitle ? data.volumeInfo.subtitle : null,
          authors: data.volumeInfo.authors ? data.volumeInfo.authors : null,
          description: data.volumeInfo.description
            ? data.volumeInfo.description
            : null,
          thumbnail: data.volumeInfo.imageLinks.thumbnail
            ? data.volumeInfo.imageLinks.thumbnail
            : null,
        };
      }
      const response = await axios.patch("http://localhost:5000/addToCart", {
        email: userData.email,
        type: userData.type,
        whereToAdd: whereToAdd,
        itemToAdd: whereToAdd == "bookCart" ? dataToAdd : data,
      });
      console.log("request res::::", response);
    } catch (error) {
      console.log(error);
    }
  };

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
      const response = await axios.get(
        "https://s51-badri-capstone-talehub.onrender.com/getData/topManga"
      );
      setTop50Manga(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getTop50Manhwa = async () => {
    try {
      const response = await axios.get(
        "https://s51-badri-capstone-talehub.onrender.com/getData/topManhwa"
      );
      setTop50Manhwa(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getMostPopularManga = async () => {
    try {
      const response = await axios.get(
        "https://s51-badri-capstone-talehub.onrender.com/getData/mostPopular"
      );
      setMostPopularManga(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getMostFavoriteManga = async () => {
    try {
      const response = await axios.get(
        "https://s51-badri-capstone-talehub.onrender.com/getData/mostFavorite"
      );
      setMostFavoriteManga(response.data.data);
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
    getTop50Manhwa();
    getMostPopularManga();
    getMostFavoriteManga();
  }, []);

  return (
    <div className={styles.landingPage}>
      <ToastContainer />

      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search by name, author, genre and etc..."
          className={styles.input}
        />
        {userData ? (
          <div className={styles.Buttons}>
            <Link to="/cart">
              <button className={styles.cartIcon}>
                <lord-icon
                  src="https://cdn.lordicon.com/odavpkmb.json"
                  trigger="hover"
                  colors="primary:#ffffff,secondary:#ffffff"
                  style={{ width: "50px", height: "40px" }}
                ></lord-icon>
              </button>
            </Link>
            <button onClick={logout} className={styles.login}>
              Log-Out
            </button>
          </div>
        ) : (
          <button onClick={() => onLoginClick()} className={styles.login}>
            Log-In
          </button>
        )}
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
          {topRatedBooks.length != 0 ? (
            topRatedBooks.map((book, index) => (
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
                {userData && (
                  <button
                    className={styles.cartIcon}
                    onClick={() => addToCart(book, "bookCart")}
                  >
                    <lord-icon
                      src="https://cdn.lordicon.com/mfmkufkr.json"
                      trigger="click"
                      colors="primary:#ffffff"
                      style={{ width: "50px", height: "40px" }}
                    ></lord-icon>
                  </button>
                )}
              </div>
            ))
          ) : (
            <div className={styles.loader}>
              <span>&lt;</span>
              <span>LOADING</span>
              <span>/&gt;</span>
            </div>
          )}
        </div>

        <p className={styles.titles}>Top 50 Manga:</p>
        <div className={styles.booksContainer}>
          {top50Manga.length != 0 ? (
            top50Manga &&
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
                {userData && (
                  <button
                    className={styles.cartIcon}
                    onClick={() => addToCart(book, "mangaCart")}
                  >
                    <lord-icon
                      src="https://cdn.lordicon.com/mfmkufkr.json"
                      trigger="hover"
                      colors="primary:#ffffff"
                      style={{ width: "50px", height: "40px" }}
                    ></lord-icon>
                  </button>
                )}
              </div>
            ))
          ) : (
            <div className={styles.loader}>
              <span>&lt;</span>
              <span>LOADING</span>
              <span>/&gt;</span>
            </div>
          )}
        </div>

        <p className={styles.titles}>Top 50 Manhwa:</p>

        <div className={styles.booksContainer}>
          {top50Manhwa.length != 0 ? (
            top50Manhwa &&
            top50Manhwa.map((book, index) => (
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
                {userData && (
                  <button
                    className={styles.cartIcon}
                    onClick={() => addToCart(book, "mangaCart")}
                  >
                    <lord-icon
                      src="https://cdn.lordicon.com/mfmkufkr.json"
                      trigger="hover"
                      colors="primary:#ffffff"
                      style={{ width: "50px", height: "40px" }}
                    ></lord-icon>
                  </button>
                )}
              </div>
            ))
          ) : (
            <div className={styles.loader}>
              <span>&lt;</span>
              <span>LOADING</span>
              <span>/&gt;</span>
            </div>
          )}
        </div>

        <p className={styles.titles}>Most Popular Manga:</p>

        <div className={styles.booksContainer}>
          {mostPopularManga.length != 0 ? (
            mostPopularManga &&
            mostPopularManga.map((book, index) => (
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
                {userData && (
                  <button
                    className={styles.cartIcon}
                    onClick={() => addToCart(book, "mangaCart")}
                  >
                    <lord-icon
                      src="https://cdn.lordicon.com/mfmkufkr.json"
                      trigger="hover"
                      colors="primary:#ffffff"
                      style={{ width: "50px", height: "40px" }}
                    ></lord-icon>
                  </button>
                )}
              </div>
            ))
          ) : (
            <div className={styles.loader}>
              <span>&lt;</span>
              <span>LOADING</span>
              <span>/&gt;</span>
            </div>
          )}
        </div>

        <p className={styles.titles}>Most Favorite Manga:</p>

        <div className={styles.booksContainer}>
          {mostFavoriteManga.length != 0 ? (
            mostFavoriteManga &&
            mostFavoriteManga.map((book, index) => (
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
                {userData && (
                  <button
                    className={styles.cartIcon}
                    onClick={() => addToCart(book, "mangaCart")}
                  >
                    <lord-icon
                      src="https://cdn.lordicon.com/mfmkufkr.json"
                      trigger="hover"
                      colors="primary:#ffffff"
                      style={{ width: "50px", height: "40px" }}
                    ></lord-icon>
                  </button>
                )}
              </div>
            ))
          ) : (
            <div className={styles.loader}>
              <span>&lt;</span>
              <span>LOADING</span>
              <span>/&gt;</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
