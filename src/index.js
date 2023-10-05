import React from 'react'
import App from './App.js'
// import ReactDOM from 'react-dom';
import ReactDOM from 'react-dom/client';
import './index.css'
import { BrowserRouter } from 'react-router-dom';

// React Bootstrap Get Started
import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)