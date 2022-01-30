import { postApis, userApis } from './api';

export async function fetchPosts(user) {
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
  const response = await fetch(`${api.url}/${id}`, {
    method: api.method,
  });
  return await response.json();
}

export async function createPost(post) {
  const api = postApis.create;
  return await fetch(api.url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      ...api.headers,
    },
    method: api.method,
    body: JSON.stringify(post),
  });
}
