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
  const [searchBar, setSearchBar] = useState([]);
  const [searchBarValue, setSearchBarValue] = useState("");
  const googleApiLink = "https://www.googleapis.com/books/v1/volumes?q=";

  const getBooks = async (type) => {
    try {
      const response = await axios.get(`${apiLink}${type}`);
      return response.data.items;
    } catch (error) {
      console.error("Error fetching top rated books:", error);
      return [];
    }
  };

  const ChangeSearchBar = async (data) => {
    setSearchBarValue(data);
  };

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (searchBarValue !== "") {
          const response = await axios.get(`${googleApiLink}${searchBarValue}`);
          setSearchBar(response.data.items);
        } else {
          setSearchBar([]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [searchBarValue]);

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
      console.log(books);
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

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={styles.booksPage}>
      <ToastContainer />

      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search by name, author, genre and etc..."
          className={styles.input}
          value={searchBarValue}
          onChange={(e) => ChangeSearchBar(e.target.value)}
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

      <div className={styles.booksContainer}>
        {searchBar.length > 0 &&
          searchBarValue &&
          searchBar.map((book, index) => (
            <div
              key={index}
              className={styles.book}
              style={{ background: fetchColor() }}
            >
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
          ))}
      </div>

      <div className={styles.genres}>
        <div
          className={styles.book1}
          onClick={() => scrollToSection("fiction")}
        >
          <p className={styles.categories}>
            Fictional <br />
            Books
          </p>
        </div>
        <div
          className={styles.book2}
          onClick={() => scrollToSection("suspense")}
        >
          <p className={styles.categories}>
            Suspense <br />
            Books
          </p>
        </div>
        <div
          className={styles.book3}
          onClick={() => scrollToSection("fantasy")}
        >
          <p className={styles.categories}>
            Fantasy <br />
            Books
          </p>
        </div>
        <div
          className={styles.book4}
          onClick={() => scrollToSection("romance")}
        >
          <p className={styles.categories}>
            Romance <br />
            Books
          </p>
        </div>
        <div className={styles.book5} onClick={() => scrollToSection("poetry")}>
          <p className={styles.categories}>
            Poetry <br />
            Books
          </p>
        </div>
        <div className={styles.book6} onClick={() => scrollToSection("horror")}>
          <p className={styles.categories}>
            Horror <br />
            Books
          </p>
        </div>
      </div>

      <p className={styles.titles} id="fiction">
        Fictional Books:
      </p>

      <div className={styles.booksContainer}>
        {fictionBook.length != 0 ? (
          fictionBook.map((book, index) => (
            <div
              key={index}
              className={styles.book}
              style={{ background: fetchColor() }}
            >
              {book.volumeInfo.imageLinks && (
                <a href={book.volumeInfo.canonicalVolumeLink}>
                  <img
                    src={book.volumeInfo.imageLinks.thumbnail}
                    alt="Thumbnail"
                  />
                </a>
              )}{" "}
              <h3>{book.volumeInfo.title}</h3>
              {book.volumeInfo.subtitle && (
                <p className={styles.subs}>
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

      <p className={styles.titles} id="suspense">
        Suspense Books:
      </p>

      <div className={styles.booksContainer}>
        {suspenseBook.length != 0 ? (
          suspenseBook.map((book, index) => (
            <div
              key={index}
              className={styles.book}
              style={{ background: fetchColor() }}
            >
              {book.volumeInfo.imageLinks && (
                <a href={book.volumeInfo.canonicalVolumeLink}>
                  <img
                    src={book.volumeInfo.imageLinks.thumbnail}
                    alt="Thumbnail"
                  />
                </a>
              )}{" "}
              <h3>{book.volumeInfo.title}</h3>
              {book.volumeInfo.subtitle && (
                <p className={styles.subs}>
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

      <p className={styles.titles} id="fantasy">
        Fantasy Books:
      </p>

      <div className={styles.booksContainer}>
        {fantasyBook.length != 0 ? (
          fantasyBook.map((book, index) => (
            <div
              key={index}
              className={styles.book}
              style={{ background: fetchColor() }}
            >
              {book.volumeInfo.imageLinks && (
                <a href={book.volumeInfo.canonicalVolumeLink}>
                  <img
                    src={book.volumeInfo.imageLinks.thumbnail}
                    alt="Thumbnail"
                  />
                </a>
              )}{" "}
              <h3>{book.volumeInfo.title}</h3>
              {book.volumeInfo.subtitle && (
                <p className={styles.subs}>
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

      <p className={styles.titles} id="romance">
        Romance Books:
      </p>

      <div className={styles.booksContainer}>
        {romanceBook.length != 0 ? (
          romanceBook.map((book, index) => (
            <div
              key={index}
              className={styles.book}
              style={{ background: fetchColor() }}
            >
              {book.volumeInfo.imageLinks && (
                <a href={book.volumeInfo.canonicalVolumeLink}>
                  <img
                    src={book.volumeInfo.imageLinks.thumbnail}
                    alt="Thumbnail"
                  />
                </a>
              )}{" "}
              <h3>{book.volumeInfo.title}</h3>
              {book.volumeInfo.subtitle && (
                <p className={styles.subs}>
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

      <p className={styles.titles} id="poetry">
        Poetry Books:
      </p>

      <div className={styles.booksContainer}>
        {poetryBook.length != 0 ? (
          poetryBook.map((book, index) => (
            <div
              key={index}
              className={styles.book}
              style={{ background: fetchColor() }}
            >
              {book.volumeInfo.imageLinks && (
                <a href={book.volumeInfo.canonicalVolumeLink}>
                  <img
                    src={book.volumeInfo.imageLinks.thumbnail}
                    alt="Thumbnail"
                  />
                </a>
              )}{" "}
              <h3>{book.volumeInfo.title}</h3>
              {book.volumeInfo.subtitle && (
                <p className={styles.subs}>
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

      <p className={styles.titles} id="horror">
        Horror Books:
      </p>

      <div className={styles.booksContainer}>
        {horrorBook.length != 0 ? (
          horrorBook.map((book, index) => (
            <div
              key={index}
              className={styles.book}
              style={{ background: fetchColor() }}
            >
              {book.volumeInfo.imageLinks && (
                <a href={book.volumeInfo.canonicalVolumeLink}>
                  <img
                    src={book.volumeInfo.imageLinks.thumbnail}
                    alt="Thumbnail"
                  />
                </a>
              )}{" "}
              <h3>{book.volumeInfo.title}</h3>
              {book.volumeInfo.subtitle && (
                <p className={styles.subs}>
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
