import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

// Lazy load components
const LandingPage = lazy(() => import("./components/landingPage"));
const BooksPage = lazy(() => import("./components/BooksPage"));
const MangaPage = lazy(() => import("./components/MangaPage"));
const CartPage = lazy(() => import("./components/CartPage"));
const StoryTeller = lazy(() => import("./components/StoryTeller"));
const BookFinder = lazy(() => import("./components/BookFinder"));

function loader() {
  return (
    <div className="loadmain">
      <div
        aria-label="Orange and tan hamster running in a metal wheel"
        role="img"
        className="wheel-and-hamster"
      >
        <div className="wheel"></div>
        <div className="hamster">
          <div className="hamster__body">
            <div className="hamster__head">
              <div className="hamster__ear"></div>
              <div className="hamster__eye"></div>
              <div className="hamster__nose"></div>
            </div>
            <div className="hamster__limb hamster__limb--fr"></div>
            <div className="hamster__limb hamster__limb--fl"></div>
            <div className="hamster__limb hamster__limb--br"></div>
            <div className="hamster__limb hamster__limb--bl"></div>
            <div className="hamster__tail"></div>
          </div>
        </div>
        <div className="spoke"></div>
      </div>
    </div>
  );
}

function AllRoutes({ onLoginClick, userData, setUserData }) {
  return (
    <Suspense fallback={loader()}>
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
        <Route
          path="/bookFinder"
          element={
            <BookFinder
              onLoginClick={onLoginClick}
              userData={userData}
              setUserData={setUserData}
            />
          }
        ></Route>
      </Routes>
    </Suspense>
  );
}

export default AllRoutes;
