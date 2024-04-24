import React, { useEffect, useState } from "react";
import styles from "./MangaPage.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import axios from "axios";
function MangaPage({ onLoginClick, userData, setUserData }) {
  const apiLink = "https://s51-badri-capstone-talehub.onrender.com/getData";
  const [manhwaBook, setManhwaBook] = useState([]);
  const [manhuaBook, setManhuaBook] = useState([]);
  const [oneshotBook, setOneshotBook] = useState([]);
  const [doujinshiBook, setDoujinshiBook] = useState([]);
  const [lightNovelBook, setLightNovelBook] = useState([]);
  const [novelBook, setNovelBook] = useState([]);
  const [mangaBook, setMangaBook] = useState([]);

  const getBooks = async (type) => {
    try {
      const response = await axios.get(`${apiLink}/${type}`);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching top rated books:", type, error);
      return [];
    }
  };

  const addToCart = async (data, whereToAdd) => {
    try {
      const response = await axios.patch("http://localhost:5000/addToCart", {
        email: userData.email,
        type: userData.type,
        whereToAdd: whereToAdd,
        itemToAdd: data,
      });
      console.log("request res::::", response);
    } catch (error) {
      console.log(error);
    }
  };

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

  useEffect(() => {
    const fetchManhwaBooks = async () => {
      const books = await getBooks("topManhwa");
      setManhwaBook(books);
    };
    const fetchManhuaBooks = async () => {
      const books = await getBooks("manhua");
      setManhuaBook(books);
    };
    const fetchOneshotBooks = async () => {
      const books = await getBooks("oneshots");
      setOneshotBook(books);
    };
    const fetchDoujinshiBooks = async () => {
      const books = await getBooks("doujin");
      setDoujinshiBook(books);
    };
    const fetchLightNovelBooks = async () => {
      const books = await getBooks("lightNovel");
      setLightNovelBook(books);
    };
    const fetchNovelBooks = async () => {
      const books = await getBooks("novel");
      setNovelBook(books);
    };
    const fetchMangaBooks = async () => {
      const books = await getBooks("topManga");
      setMangaBook(books);
    };

    fetchDoujinshiBooks();
    fetchLightNovelBooks();
    fetchMangaBooks();
    fetchManhuaBooks();
    fetchManhwaBooks();
    fetchNovelBooks();
    fetchOneshotBooks();
  }, []);

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

      <p className={styles.titles}>Manga:</p>

      <div className={styles.booksContainer}>
        {mangaBook.length != 0 ? (
          mangaBook.map((book, index) => (
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

      <p className={styles.titles}>Manhwas:</p>

      <div className={styles.booksContainer}>
        {manhwaBook.length != 0 ? (
          manhwaBook.map((book, index) => (
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

      <p className={styles.titles}>Manhuas:</p>

      <div className={styles.booksContainer}>
        {manhuaBook.length != 0 ? (
          manhuaBook.map((book, index) => (
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

      <p className={styles.titles}>Oneshots:</p>

      <div className={styles.booksContainer}>
        {oneshotBook.length != 0 ? (
          oneshotBook.map((book, index) => (
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

      {/* <p className={styles.titles}>Doujinshis:</p>

      <div className={styles.booksContainer}>
        {doujinshiBook.length != 0 ? (
          doujinshiBook.map((book, index) => (
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
      </div> */}

      <p className={styles.titles}>Light Novels:</p>

      <div className={styles.booksContainer}>
        {lightNovelBook.length != 0 ? (
          lightNovelBook.map((book, index) => (
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

      <p className={styles.titles}>Novels:</p>

      <div className={styles.booksContainer}>
        {novelBook.length != 0 ? (
          novelBook.map((book, index) => (
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
    </div>
  );
}

export default MangaPage;
