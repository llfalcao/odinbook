const rootUri = 'http://localhost:5000';
const apiBasePath = `${rootUri}/api/v1`;

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

export const login = {
  url: `${rootUri}/login`,
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
};
