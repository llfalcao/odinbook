import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { auth } from './api';
import NotFound from './views/NotFound';
import LandingPage from './views/LandingPage';
import Login from './views/Login';
import Home from './views/Home';

function App() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(
    () =>
      (async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        const response = await fetch(auth.url, {
          headers: auth.headers,
          method: auth.method,
        });
        const data = await response.json();
        setCurrentUser(data);
      })(),
    [],
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/odinbook" />}></Route>
        <Route
          path="/odinbook"
          element={currentUser ? <Home user={currentUser} /> : <LandingPage />}
        />
        <Route path="/odinbook/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
