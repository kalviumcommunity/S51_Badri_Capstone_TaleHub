import React, { useState } from "react";
import styles from "./story.module.css";

function StoryTeller() {
  const [selectedOption, setSelectedOption] = useState("Fiction");

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className={styles.CartPage}>
        <h1 className={styles.titles}>Select a genre</h1>
      <div className={styles.wrapper}>
        <div className={styles.option}>
          <input
            type="radio"
            className={styles.input}
            value="Fiction"
            name="btn"
            checked={selectedOption === "Fiction"}
            onChange={handleOptionChange}
          />
          <div className={styles.btn}>
            <span className={styles.span}>Fiction</span>
          </div>
        </div>
        <div className={styles.option}>
          <input
            type="radio"
            className={styles.input}
            value="Horror"
            name="btn"
            checked={selectedOption === "Horror"}
            onChange={handleOptionChange}
          />
          <div className={styles.btn}>
            <span className={styles.span}>Horror</span>
          </div>
        </div>
        <div className={styles.option}>
          <input
            type="radio"
            className={styles.input}
            value="Romance"
            name="btn"
            checked={selectedOption === "Romance"}
            onChange={handleOptionChange}
          />
          <div className={styles.btn}>
            <span className={styles.span}>Romance</span>
          </div>
        </div>
        <div className={styles.option}>
          <input
            type="radio"
            className={styles.input}
            value="Suspense"
            name="btn"
            checked={selectedOption === "Suspense"}
            onChange={handleOptionChange}
          />
          <div className={styles.btn}>
            <span className={styles.span}>Suspense</span>
          </div>
        </div>
        <div className={styles.option}>
          <input
            type="radio"
            className={styles.input}
            value="Fantasy"
            name="btn"
            checked={selectedOption === "Fantasy"}
            onChange={handleOptionChange}
          />
          <div className={styles.btn}>
            <span className={styles.span}>Fantasy</span>
          </div>
        </div>
        <div className={styles.option}>
          <input
            type="radio"
            className={styles.input}
            value="Poetry"
            name="btn"
            checked={selectedOption === "Poetry"}
            onChange={handleOptionChange}
          />
          <div className={styles.btn}>
            <span className={styles.span}>Poetry</span>
          </div>
        </div>
      </div>

      <h1 className={styles.titles}>Describe the story</h1>

    <div className={styles.textBox}>
        <textarea className={styles.textarea} placeholder="Describe here..."></textarea>
    </div>

    </div>
  );
}

export default StoryTeller;
