import AsyncStorage from '@react-native-async-storage/async-storage';

//const API_BASE_URL = 'https://sajakcodingan.biz.id:8443/studora'; 
const API_BASE_URL = 'http://10.130.120.74:8000/'; //local

const getAuthHeaders = async () => {
  const token = await AsyncStorage.getItem('authToken');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
};

export const login = async (identifier, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login/`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      // Gunakan 'username' sebagai key, karena di local & register pakai itu
      body: JSON.stringify({ 
        username: identifier, 
        password: password 
      }),
    });

    const rawText = await response.text();
    
    // Cek jika responnya HTML (Error 500) sebelum di-parse
    if (rawText.startsWith('<!DOCTYPE') || rawText.startsWith('<html')) {
      console.error('Server melempar error HTML:', rawText);
      return { success: false, error: 'Server bermasalah (500). Cek log backend.' };
    }

    const data = JSON.parse(rawText);
    
    if (response.ok && data.access) {
      await AsyncStorage.setItem('authToken', data.access);
      await AsyncStorage.setItem('refreshToken', data.refresh);
      if (data.user) {
        await AsyncStorage.setItem('userData', JSON.stringify(data.user));
      }
      return { success: true, ...data };
    }
    
    return { success: false, error: data.detail || 'Login gagal' };
  } catch (error) {
    console.error('Login error detail:', error);
    return { success: false, error: 'Masalah koneksi atau format data.' };
  }
};



export const register = async (email, username, password) => {
  console.log('Attempting register to:', `${API_BASE_URL}/api/auth/register/`);
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/register/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, username, password, confirm_password: password }),
    });
    
    const data = await response.json();
    console.log('Register response:', response.status, data);
    
    if (response.ok) {
      return { success: true, data };
    }
    
    return { success: false, error: data.detail || JSON.stringify(data) };
  } catch (error) {
    console.error('Register error:', error);
    return { success: false, error: 'Terjadi kesalahan jaringan' };
  }
};

export const getProfile = async () => {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/api/auth/me/`, {
      headers,
    });
    
    if (response.ok) {
      const data = await response.json();
      await AsyncStorage.setItem('userData', JSON.stringify(data));
      return { success: true, ...data };
    }
    
    return { success: false, error: 'Gagal mengambil profile' };
  } catch (error) {
    console.error('Get profile error:', error);
    return { success: false, error: 'Terjadi kesalahan jaringan' };
  }
};

export const logout = async () => {
  await AsyncStorage.removeItem('authToken');
  await AsyncStorage.removeItem('refreshToken');
  await AsyncStorage.removeItem('userData');
};

export const getLeaderboard = async () => {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}api/leaderboard/`, {
      headers,
    });
    
    if (response.ok) {
      return await response.json();
    }
    
    return { top_three: [], others: [], my_rank: 0, my_points: 0 };
  } catch (error) {
    console.error('Leaderboard error:', error);
    return { top_three: [], others: [], my_rank: 0, my_points: 0 };
  }
};

export const generateQuestion = async (topic) => {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/api/quiz/generate/`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ topic }),
    });
    
    const data = await response.json();
    
    if (response.ok) {
      return { success: true, ...data };
    }
    
    return { success: false, error: data.detail || 'Gagal generate pertanyaan' };
  } catch (error) {
    console.error('Generate question error:', error);
    return { success: false, error: 'Terjadi kesalahan jaringan' };
  }
};

export const checkAnswer = async (questionId, userAnswer) => {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/api/quiz/check/`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ 
        question_id: questionId, 
        user_answer: userAnswer
      }),
    });
    
    const data = await response.json();
    
    if (response.ok) {
      return { success: true, ...data };
    }
    
    return { success: false, error: data.detail || 'Gagal cek jawaban' };
  } catch (error) {
    console.error('Check answer error:', error);
    return { success: false, error: 'Terjadi kesalahan jaringan' };
  }
};

export const getMyTopics = async () => {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/api/quiz/my-topics/`, {
      headers,
    });
    
    if (response.ok) {
      return await response.json();
    }
    
    return [];
  } catch (error) {
    console.error('Get topics error:', error);
    return [];
  }
};

export const getMyAttempts = async () => {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/api/quiz/my-attempts/`, {
      headers,
    });
    
    if (response.ok) {
      return await response.json();
    }
    
    return [];
  } catch (error) {
    console.error('Get attempts error:', error);
    return [];
  }
};