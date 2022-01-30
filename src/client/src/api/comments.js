import { commentApis } from './api';

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
