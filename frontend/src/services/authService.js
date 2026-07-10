import { apiRequest } from './api';

const TOKEN_KEY = 'lodgedesk_token';
const ADMIN_KEY = 'lodgedesk_admin';

export async function login(credentials) {
  const data = await apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });

  localStorage.setItem(TOKEN_KEY, data.token);
  localStorage.setItem(ADMIN_KEY, JSON.stringify(data.admin));

  return data;
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getStoredAdmin() {
  const rawValue = localStorage.getItem(ADMIN_KEY);
  return rawValue ? JSON.parse(rawValue) : null;
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ADMIN_KEY);
}
