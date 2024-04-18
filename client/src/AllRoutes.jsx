import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/landingPage";
import BooksPage from "./components/BooksPage";
import MangaPage from "./components/MangaPage";
function AllRoutes({ onLoginClick, userData }) {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <LandingPage onLoginClick={onLoginClick} userData={userData} />
        }
      ></Route>
      <Route
        path="/books"
        element={<BooksPage onLoginClick={onLoginClick} userData={userData} />}
      ></Route>
      <Route
        path="/manga"
        element={<MangaPage onLoginClick={onLoginClick} userData={userData} />}
      ></Route>
    </Routes>
  );
}

export default AllRoutes;
