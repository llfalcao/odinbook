import { userApis } from './api';

export async function fetchUserById(userId) {
  const api = userApis.read;
  const response = await fetch(`${api.url}?id=${userId}`, {
    method: api.method,
  });
  return await response.json();
}

export async function fetchFriends(username) {
  const api = userApis.read;
  const response = await fetch(`${api.url}/${username}/friends`, {
    method: api.method,
  });
  return await response.json();
}

export async function createUser(data) {
  const location = { city: data.city, country: data.country };
  const user = { location, ...data };
  delete user.city;
  delete user.country;

  const api = userApis.create;
  return await fetch(`${api.url}/create`, {
    method: api.method,
    headers: api.headers,
    body: JSON.stringify(user),
  });
}

export async function fetchFriendRequests(userId) {
  const api = userApis.read;
  const response = await fetch(`${api.url}/${userId}/friend-requests`, {
    method: api.method,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      ...api.headers,
    },
  });
  const friendRequests = await response.json();
  const sent = [];
  const received = [];
  friendRequests.forEach((req) => {
    if (req.from === userId) {
      sent.push(req);
    } else {
      received.push(req);
    }
  });
  return { sent, received };
}
