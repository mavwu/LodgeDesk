import { apiRequest } from './api';
import { getToken } from './authService';

export function getDashboardStats() {
  return apiRequest('/admin/dashboard', {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}
