import React, { useState } from "react";
import styles from "./login.module.css"; // Import the module CSS file
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

function Login() {
  const [login, setLogin] = useState(true);

  const handleButtonClick = (e) => {
    e.preventDefault();
    setLogin(!login);
  };

  return (
    <div className={styles.div}>
      <div className={login ? styles.absoluteRight : styles.absoluteLeft}>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={false}
          modules={[Autoplay, Pagination, Navigation]}
          className={styles.mySwiper}
        >
          <SwiperSlide className={styles.SwiperSlide}>Slide 1</SwiperSlide>
          <SwiperSlide className={styles.SwiperSlide}>Slide 2</SwiperSlide>
          <SwiperSlide className={styles.SwiperSlide}>Slide 3</SwiperSlide>
          <SwiperSlide className={styles.SwiperSlide}>Slide 4</SwiperSlide>
          <SwiperSlide className={styles.SwiperSlide}>Slide 5</SwiperSlide>
          <SwiperSlide className={styles.SwiperSlide}>Slide 6</SwiperSlide>
          <SwiperSlide className={styles.SwiperSlide}>Slide 7</SwiperSlide>
          <SwiperSlide className={styles.SwiperSlide}>Slide 8</SwiperSlide>
          <SwiperSlide className={styles.SwiperSlide}>Slide 9</SwiperSlide>
        </Swiper>
      </div>

      <div className={styles.signupDiv}>
        <form
          className={`${styles.form} ${login ? styles.left1 : styles.left2}`}
        >
          <p className={styles.formTitle}>Sign in to your account</p>
          <div className={styles.inputContainer}>
            <input
              type="email"
              placeholder="Enter email"
              className={styles.input}
            />
          </div>
          <div className={styles.inputContainer}>
            <input
              type="password"
              placeholder="Enter password"
              className={styles.input}
            />
          </div>
          <button className={styles.submit}>
            Sign in
          </button>
          <p className={styles.signupLink}>
            No account?{" "}
            <button onClick={handleButtonClick} className={styles.button}>
              Sign up
            </button>
          </p>
        </form>
      </div>
      <div className={styles.signupDiv}>
        <form
          className={`${styles.form} ${login ? styles.right1 : styles.right2}`}
        >
          <p className={styles.formTitle}>Sign in to your account</p>
          <div className={styles.inputContainer}>
            <input
              type="email"
              placeholder="Enter email"
              className={styles.input}
            />
          </div>
          <div className={styles.inputContainer}>
            <input
              type="password"
              placeholder="Enter password"
              className={styles.input}
            />
          </div>
          <button className={styles.submit}>
            Sign in
          </button>
          <p className={styles.signupLink}>
            Already have an account?{" "}
            <button onClick={handleButtonClick} className={styles.button}>
              Login
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
