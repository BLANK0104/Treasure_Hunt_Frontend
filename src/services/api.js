import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor for auth token and debug logging
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log('Request:', { url: config.url, method: config.method });
  return config;
});

// Add response interceptor for debug logging
api.interceptors.response.use(
  (response) => {
    console.log('Response:', { 
      url: response.config.url, 
      status: response.status, 
      data: response.data 
    });
    return response;
  },
  (error) => {
    console.error('API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data
    });
    return Promise.reject(error);
  }
);

export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/users/login', credentials);
    if (response.data.success) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Login failed'
    };
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await api.post('/users/register', userData);
    return response.data;
  } catch (error) {
    return { 
      success: false, 
      message: error.response?.data?.message || 'Registration failed' 
    };
  }
};

export const createQuestion = async (formData) => {
  try {
    const response = await api.post('/questions', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to create question'
    };
  }
};

export const getTeamResults = async () => {
  try {
    const response = await api.get('/teams/results', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    console.log('Results response:', response.data); // Debug log
    return response.data;
  } catch (error) {
    console.error('Error fetching results:', error);
    return {
      success: false,
      results: [],
      message: error.response?.data?.message || 'Failed to fetch results'
    };
  }
};

export const getAllQuestions = async () => {
  try {
    const response = await api.get('/questions', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch questions'
    };
  }
};

export const createTeam = async (teamData) => {
  try {
    const response = await api.post('/team/create', teamData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to create team'
    };
  }
};

export const getCurrentQuestion = async () => {
  try {
    const response = await api.get('/current-question', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    console.log('Current question response:', response.data); // Debug log
    return response.data;
  } catch (error) {
    console.error('Error fetching current question:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch question'
    };
  }
};

export const submitAnswer = async (questionId, formData) => {
  try {
    const response = await api.post(`/submit/${questionId}`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log('Submit response:', response.data); // Debug log
    return response.data;
  } catch (error) {
    console.error('Submit error:', error.response?.data || error);
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to submit answer'
    };
  }
};

export const getTeams = async () => {
  try {
    const response = await api.get('/teams', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    console.log('Teams API response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching teams:', error.response?.data || error);
    return {
      success: false,
      teams: [],
      message: error.response?.data?.message || 'Failed to fetch teams'
    };
  }
};

export const getTeamAnswers = async (username) => {
  try {
    const response = await api.get(`/teams/${username}/answers`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching team answers:', error);
    return {
      success: false,
      answers: [],
      message: error.response?.data?.message || 'Failed to fetch team answers'
    };
  }
};

export const reviewAnswer = async (username, answerId, isAccepted) => {
  try {
    const response = await api.post(`/teams/${username}/answers/${answerId}/review`, {
      is_accepted: isAccepted
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error reviewing answer:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to review answer'
    };
  }
};