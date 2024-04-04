import React, { useEffect, useState } from "react";
import styles from "./login.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login({ onLoginClick }) {
  const [login, setLogin] = useState(true);
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [apires1, setapires1] = useState("");
  const [apires2, setapires2] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleButtonClick = (e) => {
    e.preventDefault();
    setLogin(!login);
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/login/signup", {
        name: signupName,
        email: signupEmail,
        password: signupPassword,
      });
      console.log("Sign-up successful:", response);
      toast.success("Sign-up successful", {
        position: "top-right",
        autoClose: 1500,
        onClose: () => {
          onLoginClick();
        },
      });
    } catch (error) {
      console.error("Error signing up:", error);
      setapires2(error);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/login/signin", {
        email,
        password,
      });
      console.log("Login successful:", response);
      toast.success("Login successful", {
        position: "top-right",
        autoClose: 1500,
        onClose: () => {
          onLoginClick();
        },
      });
      // Optionally, you can handle successful login (e.g., redirect to a new page)
    } catch (error) {
      console.error("Error logging in:", error);
      setapires1(error);
      // Optionally, handle login errors (e.g., display error message to the user)
    }
  };

  function handleCallbackResponse(response) {
    console.log("jwt:::", response.credential);
    const userObject = jwtDecode(response.credential);
    console.log(userObject);
    toast.success("Login successful", {
      position: "top-right",
      autoClose: 1500,
      onClose: () => {
        onLoginClick();
      },
    });
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "23770285817-oo8pijnvn574cknbdj8k5t17ttnrhhi8.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signinbtn"), {
      theme: "outline",
      size: "large",
    });
  }, []);

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
        <ToastContainer />
        <form
          className={`${styles.form} ${login ? styles.left1 : styles.left2}`}
          onSubmit={handleLoginSubmit}
        >
          <p className={styles.formTitle}>Sign in to your account</p>
          <div className={styles.inputContainer}>
            <input
              type="email"
              placeholder="Enter email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputContainer}>
            <input
              type="password"
              placeholder="Enter password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {apires1 &&
            apires1.response &&
            apires1.response.data &&
            apires1.response.data.message && (
              <p className={styles.error}>{apires1.response.data.message}</p>
            )}

          <button className={styles.submit}>Sign in</button>
          <div id="signinbtn"></div>
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
          onSubmit={handleSignupSubmit}
        >
          <p className={styles.formTitle}>Sign up for an account</p>
          <div className={styles.inputContainer}>
            <input
              type="text"
              placeholder="Enter Name"
              className={styles.input}
              value={signupName}
              required
              onChange={(e) => setSignupName(e.target.value)}
            />
          </div>
          <div className={styles.inputContainer}>
            <input
              type="email"
              placeholder="Enter E-Mail"
              className={styles.input}
              value={signupEmail}
              required
              onChange={(e) => setSignupEmail(e.target.value)}
            />
          </div>
          <div className={styles.inputContainer}>
            <input
              type="password"
              placeholder="Enter Password"
              className={styles.input}
              value={signupPassword}
              required
              onChange={(e) => setSignupPassword(e.target.value)}
            />
          </div>
          <div className={styles.inputContainer}>
            <input
              type="password"
              placeholder="Re-Enter Password"
              className={styles.input}
              value={confirmPassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {signupPassword &&
            confirmPassword &&
            signupPassword != confirmPassword && (
              <p className={styles.error}>Passwords do not match</p>
            )}
          {apires2 &&
            apires2.response &&
            apires2.response.data &&
            apires2.response.data.message && (
              <p className={styles.error}>{apires2.response.data.message}</p>
            )}
          <button type="submit" className={styles.submit}>
            Sign up
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
