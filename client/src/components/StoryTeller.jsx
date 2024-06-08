import React, { useEffect, useRef, useState } from "react";
import styles from "./story.module.css";
import axios from "axios";
function StoryTeller() {
  const [selectedOption, setSelectedOption] = useState("Fiction");
  const [selectedWritingStyle, setSelectedWritingStyle] = useState("Narrative");
  const [story, setStory] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedStory, setGeneratedStory] = useState("");
  const outputRef = useRef(null);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handlewritingStyleChange = (e) => {
    setSelectedWritingStyle(e.target.value);
  };

  const scrollToOutput = () => {
    if (outputRef.current) {
      outputRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (loading) {
      scrollToOutput();
    }
  }, [loading]);

  const sendPrompt = async () => {
    if (story != "") {
      setLoading(true);
      try {
        const response = await axios.post(
          "https://s51-badri-capstone-talehub.onrender.com/generateStory",
          {
            prompt: `I have a user who provided a one-sentence description of a Story: ${story}. 
            The genre in which the story should be generated is ${selectedOption}. 
            The desired writing style is ${selectedWritingStyle}. 
            Based on this description, can you write a story as big as possible. 
            In case the user provided story description is not enough to generate a good story please respond as 'Insufficient details to generate a good story. Please provide a more fleshed-out description with characters, setting, plot, and themes.'. Please respond with story only`,
          }
        );
        setGeneratedStory(response.data.summary);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className={styles.StoryPage}>
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
      <h1 className={styles.titles}>Select a writing style</h1>

      <div className={styles.wrapper}>
        <div className={styles.option}>
          <input
            type="radio"
            className={styles.input}
            value="Narrative"
            name="btn2"
            checked={selectedWritingStyle === "Narrative"}
            onChange={handlewritingStyleChange}
          />
          <div className={styles.btn}>
            <span className={styles.span}>Narrative</span>
          </div>
        </div>
        <div className={styles.option}>
          <input
            type="radio"
            className={styles.input}
            value="Descriptive"
            name="btn2"
            checked={selectedWritingStyle === "Descriptive"}
            onChange={handlewritingStyleChange}
          />
          <div className={styles.btn}>
            <span className={styles.span}>Descriptive</span>
          </div>
        </div>
        <div className={styles.option}>
          <input
            type="radio"
            className={styles.input}
            value="Expository"
            name="btn2"
            checked={selectedWritingStyle === "Expository"}
            onChange={handlewritingStyleChange}
          />
          <div className={styles.btn}>
            <span className={styles.span}>Expository</span>
          </div>
        </div>
        <div className={styles.option}>
          <input
            type="radio"
            className={styles.input}
            value="Persuasive"
            name="btn2"
            checked={selectedWritingStyle === "Persuasive"}
            onChange={handlewritingStyleChange}
          />
          <div className={styles.btn}>
            <span className={styles.span}>Persuasive</span>
          </div>
        </div>
        <div className={styles.option}>
          <input
            type="radio"
            className={styles.input}
            value="SimpleEnglish"
            name="btn2"
            checked={selectedWritingStyle === "SimpleEnglish"}
            onChange={handlewritingStyleChange}
          />
          <div className={styles.btn}>
            <span className={styles.span}>Simple</span>
          </div>
        </div>
      </div>

      <h1 className={styles.titles}>Describe the story</h1>

      <div className={styles.textBox}>
        <textarea
          className={styles.textarea}
          value={story}
          onChange={(e) => setStory(e.target.value)}
          placeholder="Describe here...

        To ensure the AI can create a fantastic story, please avoid including any explicit content, profanity, or overly mature themes in your description.
        

        "
        ></textarea>
      </div>
      <button className={styles.btns} onClick={() => sendPrompt()}>
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

      {loading ? (
        <div className={styles.loadingAni} ref={outputRef}>
          <div className={styles.typewriter}>
            <div className={styles.slide}>
              <i></i>
            </div>
            <div className={styles.paper}></div>
            <div className={styles.keyboard}></div>
          </div>
        </div>
      ) : (
        generatedStory != "" && (
          <div className={styles.output}>
            {generatedStory.split("\n").map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        )
      )}
    </div>
  );
}

export default StoryTeller;
