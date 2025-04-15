import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage/LoginPage';
import LandingPage from './LandingPage/LandingPage'
import MainPage from './MainPage/MainPage';
import './global.scss'
import Info from './Info/Info';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/landingpage" element={<LandingPage/>} />
        <Route path="/main" element={<MainPage/>} />
        <Route path="/info" element={<Info/>}/>
      </Routes>
    </Router>
  );
};

export default App;