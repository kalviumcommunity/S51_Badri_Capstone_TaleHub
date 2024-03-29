import { useState } from "react";
import "./App.css";
import { BrowserRouter, Link } from "react-router-dom";
import NavBar from "./components/navBar";
import LandingPage from "./components/landingPage";
import AllRoutes from "./AllRoutes";

function App() {
  return (
    <BrowserRouter>
      <div className="appJSX">
        <NavBar />
        <AllRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;
