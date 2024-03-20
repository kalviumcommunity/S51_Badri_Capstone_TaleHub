import React from 'react'
import { Route, Routes } from "react-router-dom";
import LandingPage from './components/landingPage';
function AllRoutes() {
  return (
    <Routes>
        <Route path="/" element={<LandingPage />}></Route>
    </Routes>

  )
}

export default AllRoutes