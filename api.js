import axios from 'axios';

// ✅ Create a reusable axios instance
const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Attach JWT token to all requests except /auth
API.interceptors.request.use(
  (config) => {
    const excludedPaths = ['/auth/login', '/auth/signup'];
    const isExcluded = excludedPaths.some((path) => config.url.includes(path));

    if (!isExcluded) {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ========== AUTH ==========
export const login = (data) => API.post('/auth/login', data);
export const signup = (data) => API.post('/auth/signup', data);

// ========== MATCHING ==========
export const getMatchSuggestions = () => API.get('/match/suggestions');
export const createMatch = (data) => API.post('/match', data);
export const getMatches = () => API.get('/match');
export const autoMatchUser = () => API.post('/match/auto');
export const updateMatch = (id, data) => API.put(`/match/${id}`, data);
export const deleteMatch = (id) => API.delete(`/match/${id}`);

// ========== ADMIN ==========
export const getDashboardStats = () => API.get('/admin/dashboard');
export const getUsers = (page = 1, limit = 10) =>
  API.get(`/admin/users?page=${page}&limit=${limit}`);
export const toggleUserStatus = (userId, isActive) =>
  API.put(`/admin/users/${userId}/status`, { isActive });
export const deleteUser = (userId) => API.delete(`/admin/users/${userId}`);

export const getTrips = (page = 1, limit = 10) =>
  API.get(`/admin/trips?page=${page}&limit=${limit}`);
export const deleteTrip = (tripId) => API.delete(`/admin/trips/${tripId}`);

export const exportData = (type) => API.get(`/admin/export/${type}`);

// ========== TRIPS ==========
export const createTrip = (data) => API.post('/trips', data);
export const getAllTrips = () => API.get('/trips');
export const getUpcomingTrips = () => API.get('/trips/upcoming');
export const getTripById = (id) => API.get(`/trips/${id}`);
export const updateTripStatus = (id, status) =>
  API.put(`/trips/${id}/status`, { status });
export const deleteTripById = (id) => API.delete(`/trips/${id}`);

// ========== CHAT ==========
export const getUserChats = () => API.get('/chat');
export const getOrCreateChat = (matchId) => API.get(`/chat/match/${matchId}`);
export const sendMessage = (data) => API.post('/chat/send', data);
export const markMessagesRead = (matchId, messageIds) =>
  API.put(`/chat/${matchId}/read`, { messageIds });
export const getChatStats = () => API.get('/chat/stats');

export default API;
