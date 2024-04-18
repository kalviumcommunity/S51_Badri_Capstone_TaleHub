import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./components/navBar";
import AllRoutes from "./AllRoutes";
import Login from "./components/login";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState({});
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
      console.log("setted userData from local storage")
    }
  }, []);

  return (
    <BrowserRouter>
      {!isLogin && (
        <div className="appJSX">
          {!isLogin && <NavBar />}
          {!isLogin && <AllRoutes onLoginClick={handleLoginClick} userData={userData}/>}
        </div>
      )}
      {isLogin && (
        <Login onLoginClick={handleLoginClick} setUserData={setUserData} />
      )}
    </BrowserRouter>
  );
}

export default App;
