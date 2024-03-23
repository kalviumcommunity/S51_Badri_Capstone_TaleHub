import React from "react";
import "./BooksPage.css";
function BooksPage() {
  return (
    <div className="booksPage">
      <div className="searchBar">
        <input
          type="text"
          placeholder="Search for books by title, author, etc..."
        />
        <button>SignIn</button>
      </div>

      <div className="genres">
        <div className="b1">
          <p className="catogories">Fictional <br />Books</p>
        </div>
        <div className="b2">
          <p className="catogories">Suspense <br />Books</p>
        </div>
        <div className="b3">
          <p className="catogories">Fantasy <br />Books</p>
        </div>
        <div className="b4">
          <p className="catogories">Romance <br />Books</p>
        </div>
        <div className="b5">
          <p className="catogories">Poetry <br />Books</p>
        </div>
        <div className="b6">
          <p className="catogories">Horror <br />Books</p>
        </div>
      </div>
    </div>
  );
}

export default BooksPage;
