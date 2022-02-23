import { postApis, userApis } from './api';

export async function fetchUserPosts(username) {
  if (!username) return;
  const api = postApis.read;
  const token = localStorage.getItem('token');
  const response = await fetch(`${api.url}?author=${username}`, {
    method: api.method,
    headers: { Authorization: `Bearer ${token}` },
  });
  return await response.json();
}

export async function fetchPostFeed(user) {
  if (!user) return;
  const api = userApis.read;
  const token = localStorage.getItem('token');
  const response = await fetch(`${api.url}/${user.username}/feed`, {
    method: api.method,
    headers: { Authorization: `Bearer ${token}` },
  });
  return await response.json();
}

export async function fetchPost(id) {
  const api = postApis.read;
  const response = await fetch(`${api.url}/${id}`, { method: api.method });
  return await response.json();
}

export async function createPost(post) {
  const api = postApis.create;
  const token = localStorage.getItem('token');
  return await fetch(api.url, {
    headers: { Authorization: `Bearer ${token}`, ...api.headers },
    method: api.method,
    body: JSON.stringify(post),
  });
}

export async function updatePost(post) {
  const api = postApis.update;
  const token = localStorage.getItem('token');
  return await fetch(`${api.url}/${post._id}/update`, {
    headers: { Authorization: `Bearer ${token}`, ...api.headers },
    method: api.method,
    body: JSON.stringify(post),
  });
}

export async function deletePost(id) {
  const api = postApis.delete;
  const token = localStorage.getItem('token');
  return await fetch(`${api.url}/${id}/delete`, {
    headers: { Authorization: `Bearer ${token}`, ...api.headers },
    method: api.method,
  });
}
