import React, { useEffect, useState } from "react";
import styles from "./MangaPage.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import axios from "axios";
import VideoBackground from "./VideoBackground";
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
          console.log("feetc runingn");
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
          ))}
      </div>

      <div className={styles.genre}>
        <VideoBackground videoSrc="./mangaBack.mp4" className={styles.book1}>
          <p className={styles.catogories}>Manga</p>
        </VideoBackground>

        <VideoBackground videoSrc="./manhwaBack.mp4" className={styles.book2}>
          <p className={styles.catogories}>Manhwa</p>
        </VideoBackground>

        <VideoBackground videoSrc="./manhuaBack.mp4" className={styles.book3}>
          <p className={styles.catogories}>Manhua</p>
        </VideoBackground>

        <VideoBackground videoSrc="./oneShotBack.mp4" className={styles.book4}>
          <p className={styles.catogories}>Oneshot</p>
        </VideoBackground>

        <VideoBackground
          videoSrc="./shortNovelBack.mp4"
          className={styles.book6}
        >
          <p className={styles.catogories}>Light Novel</p>
        </VideoBackground>

        <VideoBackground videoSrc="./novelBack.mp4" className={styles.book7}>
          <p className={styles.catogories}>Novel</p>
        </VideoBackground>
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
