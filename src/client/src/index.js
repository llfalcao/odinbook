import React from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import './styles/main.css';
import App from './App';
import LandingPage from './views/LandingPage';
import Login from './views/Login';

render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/odinbook" />} />
        <Route path="/odinbook" element={<App />}>
          <Route index element={<LandingPage />} />
        </Route>
        <Route path="/odinbook/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
