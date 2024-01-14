import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client'
//import App from './App.tsx'
import './index.css'
import Login from './views/Login.tsx'
import Home from './views/HomeView.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
        <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </Router>
  </React.StrictMode>,
)
