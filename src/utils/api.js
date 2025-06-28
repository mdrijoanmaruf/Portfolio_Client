// API configuration
const API_BASE_URL = 'https://server-theta-roan.vercel.app/api';

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
