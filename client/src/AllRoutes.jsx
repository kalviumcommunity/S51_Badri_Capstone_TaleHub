import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/landingPage";
import BooksPage from "./components/BooksPage";
import MangaPage from "./components/MangaPage";
import CartPage from "./components/CartPage";
import StoryTeller from "./components/StoryTeller";

function AllRoutes({ onLoginClick, userData, setUserData }) {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <LandingPage
            onLoginClick={onLoginClick}
            userData={userData}
            setUserData={setUserData}
          />
        }
      ></Route>
      <Route
        path="/books"
        element={
          <BooksPage
            onLoginClick={onLoginClick}
            userData={userData}
            setUserData={setUserData}
          />
        }
      ></Route>
      <Route
        path="/manga"
        element={
          <MangaPage
            onLoginClick={onLoginClick}
            userData={userData}
            setUserData={setUserData}
          />
        }
      ></Route>
      <Route
        path="/cart"
        element={
          <CartPage
            onLoginClick={onLoginClick}
            userData={userData}
            setUserData={setUserData}
          />
        }
      ></Route>
      <Route path="/story" element={<StoryTeller />}></Route>
    </Routes>
  );
}

export default AllRoutes;
