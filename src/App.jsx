import { useState } from 'react';
import Navbar from './pages/Navbar/navbar';
import {Route, Routes } from 'react-router-dom';
import Stocks from './pages/Stocks/stocks';
import Trading from './pages/Trading/trading';

function App() {

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Trading/>}/>
        <Route exact path="/stocks" element={<Stocks/>}/>
      </Routes>
    </>
  )
}

export default App
