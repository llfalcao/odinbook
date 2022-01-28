import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { verifyJWT } from './api';
import Home from './views/Home';
import Login from './views/Login';
import NotFound from './views/NotFound';
import { useEffect, useState } from 'react';
import PostCreator from './views/PostCreator';

function App() {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState('loading');

  const userAuth = async () => {
    const userData = await verifyJWT();
    if (userData) {
      setUser(userData);
      setStatus('successful');
    } else {
      setStatus('failed');
    }
  };

  useEffect(() => userAuth(), []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/odinbook" />} />
        <Route path="/odinbook">
          <Route index element={<Home user={user} status={status} />} />
          <Route path="new-post" element={<PostCreator user={user} />} />
          <Route
            path="login"
            element={
              <Login
                currentUser={user}
                authenticate={userAuth}
                status={status}
              />
            }
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
