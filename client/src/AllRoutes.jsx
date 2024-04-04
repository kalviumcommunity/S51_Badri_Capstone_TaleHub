import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/landingPage";
import BooksPage from "./components/BooksPage";
import MangaPage from "./components/MangaPage";
function AllRoutes({ onLoginClick }) {
  return (
    <Routes>
      <Route
        path="/"
        element={<LandingPage onLoginClick={onLoginClick} />}
      ></Route>
      <Route
        path="/books"
        element={<BooksPage onLoginClick={onLoginClick} />}
      ></Route>
      <Route
        path="/manga"
        element={<MangaPage onLoginClick={onLoginClick} />}
      ></Route>
    </Routes>
  );
}

export default AllRoutes;
