import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Créer une instance axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token à chaque requête
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercepteur pour gérer les erreurs
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data) => api.put('/auth/profile', data),
  changePassword: (data) => api.put('/auth/change-password', data),
};

// Appointments API
export const appointmentsAPI = {
  create: (data) => api.post('/appointments', data),
  getMyAppointments: (params) => api.get('/appointments/my-appointments', { params }),
  getById: (id) => api.get(`/appointments/${id}`),
  cancel: (id) => api.put(`/appointments/${id}/cancel`),
  complete: (id) => api.put(`/appointments/${id}/complete`),
};

// Professionals API
export const professionalsAPI = {
  search: (params) => api.get('/professionals/search', { params }),
  getById: (id) => api.get(`/professionals/${id}`),
  createProfile: (data) => api.post('/professionals/profile', data),
  createAvailabilities: (data) => api.post('/professionals/availabilities', data),
  getAvailabilities: (professionalId, params) => 
    api.get(`/professionals/${professionalId}/availabilities`, { params }),
  deleteAvailability: (id) => api.delete(`/professionals/availabilities/${id}`),
  getSolidaritySlots: (params) => api.get('/professionals/solidarity/slots', { params }),
};

// Pharmacies API
export const pharmaciesAPI = {
  search: (params) => api.get('/pharmacies/search', { params }),
  getById: (id) => api.get(`/pharmacies/${id}`),
  createProfile: (data) => api.post('/pharmacies/profile', data),
  addMedicine: (data) => api.post('/pharmacies/medicines', data),
  updateMedicine: (id, data) => api.put(`/pharmacies/medicines/${id}`, data),
  deleteMedicine: (id) => api.delete(`/pharmacies/medicines/${id}`),
  searchMedicines: (params) => api.get('/pharmacies/medicines/search', { params }),
  getSolidarityMedicines: (params) => api.get('/pharmacies/medicines/solidarity', { params }),
};

// Donations API
export const donationsAPI = {
  create: (data) => api.post('/donations', data),
  getAll: (params) => api.get('/donations', { params }),
  getStats: () => api.get('/donations/stats'),
  getMyDonations: () => api.get('/donations/my-donations'),
  getById: (id) => api.get(`/donations/${id}`),
  getTopDonors: (params) => api.get('/donations/top-donors', { params }),
};

export default api;
