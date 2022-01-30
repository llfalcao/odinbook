import { login, auth } from './api';

export async function handleLogin(user) {
  const api = login;
  const response = await fetch(api.url, {
    headers: api.headers,
    method: api.method,
    body: JSON.stringify(user),
  });
  return await response.json();
}

export async function verifyJWT() {
  const token = localStorage.getItem('token');
  if (!token) return;

  try {
    const response = await fetch(auth.url, {
      method: auth.method,
      headers: {
        Authorization: `Bearer ${token}`,
        ...auth.headers,
      },
    });
    return await response.json();
  } catch (error) {
    return null;
  }
}
