import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { getCurrentUser } from './api/auth';
import RequireAuth from './auth';
import Home from './views/Home';
import Login from './views/Login';
import SignUp from './views/SignUp';
import NotFound from './views/NotFound';
import PostCreator from './views/PostCreator';
import PostViewer from './views/PostViewer';
import Profile from './views/Profile';
import Header from './components/Header';
import PostEditor from './views/PostEditor';
import GithubInfo from './components/GithubInfo';

function App() {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState('loading');
  const [token, setToken] = useState(null);

  const userAuth = async () => {
    const userData = await getCurrentUser();
    if (userData) {
      setUser(userData);
      setToken(localStorage.getItem('token'));
      setStatus('successful');
    } else {
      setStatus('failed');
    }
  };

  useEffect(() => userAuth(), []);

  const clearInfo = () => setUser(null);

  return (
    <BrowserRouter>
      <Header user={user} clearInfo={clearInfo} />

      <Routes>
        <Route path="/" element={<Navigate to="/odinbook" />} />
        <Route path="/odinbook">
          <Route
            path="login"
            element={
              <Login authenticate={userAuth} status={status} token={token} />
            }
          />
          <Route
            path="signup"
            element={
              <SignUp authenticate={userAuth} status={status} token={token} />
            }
          />
          <Route
            index
            element={<Home user={user} status={status} token={token} />}
          />
          <Route element={<RequireAuth status={status} token={token} />}>
            <Route path="new-post" element={<PostCreator user={user} />} />
            <Route path="p/:post" element={<PostViewer user={user} />} />
            <Route path="p/:post/edit" element={<PostEditor user={user} />} />
            <Route path="u/:user" element={<Profile user={user} />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound user={user} />} />
      </Routes>

      <GithubInfo />
    </BrowserRouter>
  );
}

export default App;
