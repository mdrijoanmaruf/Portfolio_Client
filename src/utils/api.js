// API configuration
// const API_BASE_URL = 'https://server-theta-roan.vercel.app/api';
const API_BASE_URL = 'http://localhost:5000/api';

// Helper function for making API requests
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const config = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

// Projects API functions
export const projectsAPI = {
  // Get all projects
  getAll: () => apiRequest('/projects'),

  // Get featured projects
  getFeatured: () => apiRequest('/projects/featured'),

  // Get projects by category
  getByCategory: (category) => apiRequest(`/projects/category/${encodeURIComponent(category)}`),

  // Get single project
  getById: (id) => apiRequest(`/projects/${id}`),

  // Add new project
  create: (projectData) => apiRequest('/projects', {
    method: 'POST',
    body: JSON.stringify(projectData),
  }),

  // Update project
  update: (id, projectData) => apiRequest(`/projects/${id}`, {
    method: 'PUT',
    body: JSON.stringify(projectData),
  }),

  // Delete project
  delete: (id) => apiRequest(`/projects/${id}`, {
    method: 'DELETE',
  }),

  // Get project statistics
  getStats: () => apiRequest('/projects/stats/overview'),

  // Search projects
  search: (query) => apiRequest(`/projects/search/${encodeURIComponent(query)}`),
};

// Coursework API functions
export const courseworkAPI = {
  // Get all coursework
  getAll: () => apiRequest('/coursework'),

  // Add new coursework (admin only)
  create: (courseworkData) => apiRequest('/coursework', {
    method: 'POST',
    body: JSON.stringify(courseworkData),
  }),

  // Update coursework (admin only)
  update: (id, courseworkData) => apiRequest(`/coursework/${id}`, {
    method: 'PUT',
    body: JSON.stringify(courseworkData),
  }),

  // Delete coursework (admin only)
  delete: (id, userEmail) => apiRequest(`/coursework/${id}`, {
    method: 'DELETE',
    body: JSON.stringify({ userEmail }),
  }),
};

// Contact Form API functions
export const contactsAPI = {
  // Submit contact form
  submit: (contactData) => apiRequest('/contacts', {
    method: 'POST',
    body: JSON.stringify(contactData),
  }),

  // Get all contacts (admin only)
  getAll: (userEmail) => apiRequest(`/contacts?userEmail=${encodeURIComponent(userEmail)}`),

  // Mark contact as read (admin only)
  markAsRead: (id, userEmail) => apiRequest(`/contacts/${id}/read`, {
    method: 'PUT',
    body: JSON.stringify({ userEmail }),
  }),

  // Delete contact (admin only)
  delete: (id, userEmail) => apiRequest(`/contacts/${id}`, {
    method: 'DELETE',
    body: JSON.stringify({ userEmail }),
  }),
};

// Server health check
export const serverAPI = {
  healthCheck: () => apiRequest('', { 
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  }).catch(() => {
    // If projects endpoint fails, try base URL
    return fetch('https://server-theta-roan.vercel.app').then(res => res.json());
  }),
};

export default projectsAPI;
