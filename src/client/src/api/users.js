import { userApis } from './api';

export async function fetchUser(username) {
  const api = userApis.read;
  const response = await fetch(`${api.url}/${username}`);
  return await response.json();
}

export async function fetchUserById(userId) {
  const api = userApis.read;
  const response = await fetch(`${api.url}?id=${userId}`);
  return await response.json();
}

export async function fetchFriends(username) {
  const api = userApis.read;
  const response = await fetch(`${api.url}/${username}/friends`);
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
  const token = localStorage.getItem('token');
  const response = await fetch(`${api.url}/${userId}/friend-requests`, {
    headers: { Authorization: `Bearer ${token}`, ...api.headers },
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

export async function addFriend(userId, friendId, requestId) {
  const api = userApis.create;
  const token = localStorage.getItem('token');
  return await fetch(
    `${api.url}/${userId}/friend-requests/confirm?from=${friendId}`,
    {
      method: api.method,
      headers: { Authorization: `Bearer ${token}`, ...api.headers },
      body: JSON.stringify({ friendId, requestId }),
    },
  );
}
