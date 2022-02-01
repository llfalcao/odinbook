import { commentApis } from './api';

export async function fetchComments(postId) {
  const api = commentApis.read;
  const response = await fetch(`${api.url}?post=${postId}`, {
    method: api.method,
  });
  return await response.json();
}

export async function submitComment(comment) {
  const api = commentApis.create;
  return await fetch(`${api.url}?post=${comment.post}`, {
    method: api.method,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      ...api.headers,
    },
    body: JSON.stringify(comment),
  });
}
