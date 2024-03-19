import React from "react";
import "./landingPage.css";
function LandingPage() {
  return (
    <div className="landingPage">
      <div className="searchBar">
        <input
          type="text"
          placeholder="Search by name, author, genre and etc..."
        />
        <button>SignIn</button>
      </div>
      <div className="genre">
        <div className="d1">
          <p className="catogories"> Top 50 Manga</p>
        </div>
        <div className="d2">
          <p className="catogories">Top 50 Manhwa</p>
        </div>
        <div className="d3">
          <p className="catogories">Latest Books</p>
        </div>
        <div className="d4">
          <p className="catogories">Top Rated Books</p>
        </div>
        <div className="d5">
          <p className="catogories">Most Popular <br /> Manga's</p>
        </div>
        <div className="d6">
          <p className="catogories">Most Favorite <br />Manga's</p>
        </div>
        <div className="d7">
          <p className="catogories">Vintage Books</p>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
