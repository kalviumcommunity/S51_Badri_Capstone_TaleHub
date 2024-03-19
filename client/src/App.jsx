import { useState } from "react";
import "./App.css";
import NavBar from "./components/navBar";
import LandingPage from "./components/landingPage";

function App() {
  return (
    <div className="appJSX">
      <NavBar />
      <LandingPage />
    </div>
  );
}

export default App;
