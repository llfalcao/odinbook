import { userApis } from './api';

export async function fetchUserById(userId) {
  const api = userApis.read;
  const response = await fetch(`${api.url}?id=${userId}`, {
    method: api.method,
  });
  return await response.json();
}
