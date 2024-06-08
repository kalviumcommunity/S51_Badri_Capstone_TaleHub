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
  const [searchBar, setSearchBar] = useState([]);
  const [searchBarValue, setSearchBarValue] = useState("");

  const getBooks = async (type) => {
    try {
      const response = await axios.get(`${apiLink}/${type}`);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching top rated books:", type, error);
      return [];
    }
  };

  const ChangeSearchBar = async (data) => {
    setSearchBarValue(data);
  };

  useEffect(() => {
    let fetched = false;

    const fetchData = async (apiKey) => {
      try {
        if (!fetched) {
          const options = {
            method: "GET",
            url: "https://myanimelist.p.rapidapi.com/v2/manga/search",
            params: {
              q: searchBarValue,
              n: "50",
              score: "0",
              genre: "1",
            },
            headers: {
              "X-RapidAPI-Key": apiKey,
              "X-RapidAPI-Host": "myanimelist.p.rapidapi.com",
            },
          };
          const response = await axios.request(options);
          setSearchBar(response.data);
          fetched = true; // Update fetched flag
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSequentially = async () => {
      try {
        if (!fetched && searchBarValue !== "") {
          await fetchData("468b267b84mshe5256b2b59ee957p111078jsn666fc3a3d2fe");
        }
        if (!fetched && searchBarValue !== "") {
          await fetchData("9e062c46a0msh80df1d40872150fp16a8d0jsndb1e10165494");
        }

        if (!fetched && searchBarValue !== "") {
          await fetchData("e474091566msh4659433272064b9p1de085jsn47379338079a");
        }

        if (!fetched && searchBarValue !== "") {
          await fetchData("9e062c46a0msh80df1d40872150fp16a8d0jsndb1e10165494");
        }

        if (!fetched && searchBarValue !== "") {
          await fetchData("b377a6820amsh32f699556ee6d0fp1c0a47jsnbff6aff83640");
        }

        if (!fetched && searchBarValue !== "") {
          await fetchData("656ec1f26cmshece4333fd6bda55p1a5c2fjsnb6b2d6831faa");
        }

        if (!fetched && searchBarValue !== "") {
          await fetchData("744a2be11fmsh13d9494e99943b3p1507bejsn1094ef1b8b6d");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchSequentially();
  }, [searchBarValue]);

  const addToCart = async (data, whereToAdd) => {
    try {
      const response = await axios.patch("https://s51-badri-capstone-talehub.onrender.com/addToCart", {
        email: userData.email,
        type: userData.type,
        whereToAdd: whereToAdd,
        itemToAdd: data,
      });
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

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={styles.mangaPage}>
      <ToastContainer />

      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search for manga by title"
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
          searchBar.map((book, index) => (
            <div
              key={index}
              className={styles.book}
              style={{ background: fetchColor() }}
            >
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
          ))}
      </div>

      <div className={styles.genre}>
        <div className={styles.book1}  onClick={() => scrollToSection("Manga")}>
          <p className={styles.catogories}>Manga</p>
        </div>
        <div className={styles.book2}  onClick={() => scrollToSection("Manhwa")}>
          <p className={styles.catogories}>Manhwa</p>
        </div>
        <div className={styles.book3}  onClick={() => scrollToSection("Manhua")}>
          <p className={styles.catogories}>Manhua</p>
        </div>
        <div className={styles.book4}  onClick={() => scrollToSection("Oneshot")}>
          <p className={styles.catogories}>Oneshot</p>
        </div>

        <div className={styles.book6}  onClick={() => scrollToSection("Light Novel")}>
          <p className={styles.catogories}>Light Novel</p>
        </div>
        <div className={styles.book7}  onClick={() => scrollToSection("Novel")}>
          <p className={styles.catogories}>Novel</p>
        </div>
      </div>

      <p className={styles.titles} id="Manga">Manga:</p>

      <div className={styles.booksContainer}>
        {mangaBook.length != 0 ? (
          mangaBook.map((book, index) => (
            <div
              key={index}
              className={styles.book}
              style={{ background: fetchColor() }}
            >
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

      <p className={styles.titles} id="Manhwa">Manhwas:</p>

      <div className={styles.booksContainer}>
        {manhwaBook.length != 0 ? (
          manhwaBook.map((book, index) => (
            <div
              key={index}
              className={styles.book}
              style={{ background: fetchColor() }}
            >
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

      <p className={styles.titles} id="Manhua">Manhuas:</p>

      <div className={styles.booksContainer}>
        {manhuaBook.length != 0 ? (
          manhuaBook.map((book, index) => (
            <div
              key={index}
              className={styles.book}
              style={{ background: fetchColor() }}
            >
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

      <p className={styles.titles} id="Oneshot">Oneshots:</p>

      <div className={styles.booksContainer}>
        {oneshotBook.length != 0 ? (
          oneshotBook.map((book, index) => (
            <div
              key={index}
              className={styles.book}
              style={{ background: fetchColor() }}
            >
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

      <p className={styles.titles} id="Light Novel">Light Novels:</p>

      <div className={styles.booksContainer}>
        {lightNovelBook.length != 0 ? (
          lightNovelBook.map((book, index) => (
            <div
              key={index}
              className={styles.book}
              style={{ background: fetchColor() }}
            >
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

      <p className={styles.titles} id="Novel">Novels:</p>

      <div className={styles.booksContainer}>
        {novelBook.length != 0 ? (
          novelBook.map((book, index) => (
            <div
              key={index}
              className={styles.book}
              style={{ background: fetchColor() }}
            >
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
