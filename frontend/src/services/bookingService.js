import { apiRequest } from './api';
import { getToken } from './authService';

function authHeaders() {
  return {
    Authorization: `Bearer ${getToken()}`,
  };
}

export function createBooking(payload) {
  return apiRequest('/bookings', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function getAdminBookings() {
  return apiRequest('/admin/bookings', {
    headers: authHeaders(),
  });
}

export function updateBookingStatus(bookingId, status) {
  return apiRequest(`/admin/bookings/${bookingId}/status`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify({ status }),
  });
}
