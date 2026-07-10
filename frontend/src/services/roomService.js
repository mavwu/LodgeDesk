import { apiRequest } from './api';
import { getToken } from './authService';

function authHeaders() {
  return {
    Authorization: `Bearer ${getToken()}`,
  };
}

export function getRooms() {
  return apiRequest('/rooms');
}

export function getRoomBySlug(slug) {
  return apiRequest(`/rooms/${slug}`);
}

export function getAdminRooms() {
  return apiRequest('/admin/rooms', {
    headers: authHeaders(),
  });
}

export function createAdminRoom(payload) {
  return apiRequest('/admin/rooms', {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
}

export function updateAdminRoom(roomId, payload) {
  return apiRequest(`/admin/rooms/${roomId}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
}

export function deleteAdminRoom(roomId) {
  return apiRequest(`/admin/rooms/${roomId}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
}
