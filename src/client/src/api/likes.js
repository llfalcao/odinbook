import { likeApis } from './api';

export async function fetchLikes(post) {
  const api = likeApis.read;
  const response = await fetch(`${api.url}/${post}`, {
    headers: api.headers,
    method: api.method,
  });
  return await response.json();
}

export async function toggleLike(post, isLiked) {
  const api = likeApis.create;
  return await fetch(`${api.url}/${post}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      ...api.headers,
    },
    method: api.method,
    body: JSON.stringify({ active: !isLiked }),
  });
}
