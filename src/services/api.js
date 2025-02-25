import axios from 'axios';

const generateDeviceId = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

const deviceId = localStorage.getItem('deviceId') || generateDeviceId();
localStorage.setItem('deviceId', deviceId);

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
    const response = await api.post('/users/login', {
      ...credentials,
      deviceId
    });
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


export const logoutUser = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      localStorage.removeItem('user');
      localStorage.removeItem('deviceId');
      return { success: true };
    }

    // Remove /api prefix since it's already in the baseURL
    const response = await api.post('/users/logout', { deviceId });
    
    // Clear all local storage items
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('deviceId');

    return {
      success: true,
      message: response.data?.message || 'Logged out successfully'
    };
  } catch (error) {
    console.error('Logout error:', error);
    // Still remove local storage items even if server request fails
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('deviceId');
    return {
      success: true,
      message: 'Logged out locally'
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

export const getCurrentQuestion = async (isBonus = false) => {
  try {
    const response = await api.get(`/current-question?is_bonus=${isBonus}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
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

    if (response.data.success) {
      return {
        success: true,
        answers: response.data.answers.map(answer => ({
          ...answer,
          submitted_at: answer.submitted_at ? new Date(answer.submitted_at) : null,
          reviewed_at: answer.reviewed_at ? new Date(answer.reviewed_at) : null
        }))
      };
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error('Error fetching team answers:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch team answers'
    };
  }
};

export const reviewAnswer = async (username, answerId, isAccepted) => {
  try {
    const response = await api.post(
      `/teams/${username}/answers/${answerId}/review`,
      { isAccepted },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error reviewing answer:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to review answer'
    };
  }
};