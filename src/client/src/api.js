const rootUri = 'http://localhost:5000';
const apiBasePath = `${rootUri}/api/v1`;

export const login = {
  url: `${rootUri}/login`,
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
};

export const auth = {
  url: `${rootUri}/auth`,
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
};

export async function verifyJWT() {
  const token = localStorage.getItem('token');
  if (!token) return;

  const response = await fetch(auth.url, {
    method: auth.method,
    headers: {
      Authorization: `Bearer ${token}`,
      ...auth.headers,
    },
  });

  return await response.json();
}

export const userApis = {
  read: {
    url: `${apiBasePath}/users`,
    method: 'GET',
  },
  create: {
    url: `${apiBasePath}/users`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  },
  update: {
    url: `${apiBasePath}/users`,
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
  },
  delete: {
    url: `${apiBasePath}/users`,
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  },
};

export const postApis = {
  read: {
    url: `${apiBasePath}/posts`,
    method: 'GET',
  },
  create: {
    url: `${apiBasePath}/posts`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  },
  update: {
    url: `${apiBasePath}/posts`,
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
  },
  delete: {
    url: `${apiBasePath}/posts`,
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  },
};

export const likeApis = {
  read: {
    url: `${apiBasePath}/likes`,
    method: 'GET',
  },
  create: {
    url: `${apiBasePath}/likes`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  },
};
