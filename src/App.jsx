import React from 'react';
import {BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Mangalist from './component/MangaList.jsx';
import Add from './component/Add.jsx';
import Edit from './component/Edit.jsx';
import './App.css';

function App() {
 
  return (
    <>
      <div className='container'>
        <h1 className='my-5 text-center'>
          PHP REACT APP
        </h1>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Mangalist />}/>
            <Route path="/add" element={<Add />} />
            <Route path="/edit/:bm_id" element={<Edit />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
