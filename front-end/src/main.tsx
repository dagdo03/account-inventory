import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client'
import './index.css'
import Login from './views/Login.tsx'
import Data from './views/DataView.tsx';
import Register from './views/RegisterView.tsx';
import Home from './views/HomeView.tsx';
import Add from './views/AddDataView.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
        <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/data' element={<Data />} />
        <Route path='/register' element={<Register />} />
        <Route path='/home' element={<Home />} />
        <Route path='/newdata' element={<Add />} />
      </Routes>
    </Router>
  </React.StrictMode>,
)
