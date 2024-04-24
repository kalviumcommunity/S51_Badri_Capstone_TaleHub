import React, { useEffect, useState } from "react";
import styles from "./BooksPage.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import axios from "axios";
function BooksPage({ onLoginClick, userData, setUserData }) {
  const apiLink = "https://www.googleapis.com/books/v1/volumes?q=subject:";
  const [suspenseBook, setsuspenseBook] = useState([]);
  const [romanceBook, setromanceBook] = useState([]);
  const [horrorBook, sethorrorBook] = useState([]);
  const [poetryBook, setpoetryBook] = useState([]);
  const [fictionBook, setfictionBook] = useState([]);
  const [fantasyBook, setfantasyBook] = useState([]);

  const getBooks = async (type) => {
    try {
      const response = await axios.get(`${apiLink}${type}`);
      return response.data.items;
    } catch (error) {
      console.error("Error fetching top rated books:", error);
      return [];
    }
  };

  const addToCart = async (data, whereToAdd) => {
    try {
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

      const response = await axios.patch("http://localhost:5000/addToCart", {
        email: userData.email,
        type: userData.type,
        whereToAdd: whereToAdd,
        itemToAdd: dataToAdd,
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
    const fetchFictionBooks = async () => {
      const books = await getBooks("fiction");
      setfictionBook(books);
    };
    const fetchRomanceBooks = async () => {
      const books = await getBooks("romance");
      setromanceBook(books);
    };
    const fetchPoetryBooks = async () => {
      const books = await getBooks("poetry");
      setpoetryBook(books);
    };
    const fetchHorrorBooks = async () => {
      const books = await getBooks("horror");
      sethorrorBook(books);
    };
    const fetchFantasyBooks = async () => {
      const books = await getBooks("fantasy");
      setfantasyBook(books);
    };
    const fetchSuspenseBooks = async () => {
      const books = await getBooks("suspense");
      setsuspenseBook(books);
    };

    fetchFantasyBooks();
    fetchFictionBooks();
    fetchHorrorBooks();
    fetchPoetryBooks();
    fetchRomanceBooks();
    fetchSuspenseBooks();
  }, []);
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

      <p className={styles.titles}>Fictional Books:</p>

      <div className={styles.booksContainer}>
        {fictionBook.length != 0 ? (
          fictionBook.map((book, index) => (
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

      <p className={styles.titles}>Suspense Books:</p>

      <div className={styles.booksContainer}>
        {suspenseBook.length != 0 ? (
          suspenseBook.map((book, index) => (
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

      <p className={styles.titles}>Fantasy Books:</p>

      <div className={styles.booksContainer}>
        {fantasyBook.length != 0 ? (
          fantasyBook.map((book, index) => (
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

      <p className={styles.titles}>Romance Books:</p>

      <div className={styles.booksContainer}>
        {romanceBook.length != 0 ? (
          romanceBook.map((book, index) => (
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

      <p className={styles.titles}>Poetry Books:</p>

      <div className={styles.booksContainer}>
        {poetryBook.length != 0 ? (
          poetryBook.map((book, index) => (
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

      <p className={styles.titles}>Horror Books:</p>

      <div className={styles.booksContainer}>
        {horrorBook.length != 0 ? (
          horrorBook.map((book, index) => (
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
    </div>
  );
}

export default BooksPage;
