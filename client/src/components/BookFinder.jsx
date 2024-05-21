import React, { useState } from "react";
import styles from "./booksFinder.module.css";
import axios from "axios";

function BookFinder() {
  const [story, setStory] = useState("");
  const [books, , setBooks] = useState([]);
  const fetchBooks = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/recommendBooks",
        {
          story: data,
        }
      );
      setBooks(response.data.books.books);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGenerateClick = () => {
    fetchBooks(story);
  };

  return (
    <div className={styles.StoryPage}>
      <h1 className={styles.titles}>Describe the story</h1>

      <div className={styles.textBox}>
        <textarea
          className={styles.textarea}
          value={story}
          onChange={(e) => setStory(e.target.value)}
          placeholder="Describe here...

        Please mention the story as detailed as possible for the best results. Try not to use any inappropriate language.
        

        "
        ></textarea>
      </div>

      <button className={styles.btns} onClick={handleGenerateClick}>
        <svg
          height="24"
          width="24"
          fill="#FFFFFF"
          viewBox="0 0 24 24"
          data-name="Layer 1"
          id="Layer_1"
          className={styles.sparkle}
        >
          <path d="M10,21.236,6.755,14.745.264,11.5,6.755,8.255,10,1.764l3.245,6.491L19.736,11.5l-6.491,3.245ZM18,21l1.5,3L21,21l3-1.5L21,18l-1.5-3L18,18l-3,1.5ZM19.333,4.667,20.5,7l1.167-2.333L24,3.5,21.667,2.333,20.5,0,19.333,2.333,17,3.5Z"></path>
        </svg>

        <span className={styles.text}>Generate</span>
      </button>
    </div>
  );
}

export default BookFinder;
