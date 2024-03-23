import React from 'react'
import { Route, Routes } from "react-router-dom";
import LandingPage from './components/landingPage';
import BooksPage from './components/BooksPage';
function AllRoutes() {
  return (
    <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path='/books' element={<BooksPage/>}></Route>
    </Routes>

  )
}

export default AllRoutes