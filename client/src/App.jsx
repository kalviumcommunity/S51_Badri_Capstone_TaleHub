import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./components/navBar";
import AllRoutes from "./AllRoutes";
import Login from "./components/login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  const handleLoginClick = () => {
    setIsLogin(!isLogin);
  };
  console.log("userData:", userData);

  useEffect(() => {
    const email = localStorage.getItem("email");
    const type = localStorage.getItem("type");

    if (email && type) {
      const Data = { email, type };
      setUserData(Data);
      console.log("setted userData from local storage");
      toast.success("Auto Log-In successful", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }, []);

  return (
    <BrowserRouter>
      {!isLogin && (
        <div className="appJSX">
          {!isLogin && <NavBar />}
          {!isLogin && (
            <AllRoutes
              onLoginClick={handleLoginClick}
              userData={userData}
              setUserData={setUserData}
            />
          )}
        </div>
      )}
      {isLogin && (
        <Login onLoginClick={handleLoginClick} setUserData={setUserData} />
      )}
    </BrowserRouter>
  );
}

export default App;
