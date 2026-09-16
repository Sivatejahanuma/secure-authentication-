import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request Interceptor: Attach JWT Bearer Token if present
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('securex_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle centralized error extraction
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If response exists from backend, preserve the clean backend error payload
    if (error.response && error.response.status === 401) {
      // If token expired or invalid, we can optionally notify auth listeners
      console.warn('[API Auth Interceptor] 401 Unauthorized encountered:', error.response.data?.message);
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  // Register a new user
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  // Authenticate user
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  // Get current authenticated user profile
  getMe: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  // Invalidate session / logout
  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },

  // System health check
  getHealth: async () => {
    const response = await api.get('/health');
    return response.data;
  },

  // Direct test helper with optional custom/tampered token for evaluator demonstration
  testEndpoint: async (path = '/auth/me', customToken = null) => {
    const headers = {};
    if (customToken !== null) {
      headers.Authorization = customToken ? `Bearer ${customToken}` : '';
    }
    const response = await api.get(path, { headers });
    return {
      status: response.status,
      data: response.data,
      headers: response.headers,
    };
  },
};

export default api;
