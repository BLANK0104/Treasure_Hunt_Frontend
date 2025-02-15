import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

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

export const getTeamAnswers = async () => {
  try {
    const response = await api.get('/team/submissions', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch team submissions'
    };
  }
};

export const reviewAnswer = async (teamId, isAccepted) => {
  try {
    const response = await api.post(`/team/review/${teamId}`, 
      { is_accepted: isAccepted },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    );
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to review answer'
    };
  }
};

export const getTeamResults = async () => {
  try {
    const response = await api.get('/team/results', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    return {
      success: false,
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
    const response = await api.get('/team/current-question', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch question'
    };
  }
};

export const submitAnswer = async (questionId, formData) => {
  try {
    if (!questionId) {
      throw new Error('Question ID is required');
    }

    const response = await api.post(`/team/submit/${questionId}`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        // Don't set Content-Type here, let the browser set it with the boundary
      }
    });
    return response.data;
  } catch (error) {
    console.error('Submit error:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to submit answer'
    };
  }
};