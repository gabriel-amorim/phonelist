import './App.css';
import React, { useState } from 'react';
import Login from "./pages/login";
import Signup from "./pages/signup"
import Home from "./pages/home"
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/home" element={<Home />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

