import axios from 'axios';
import { API_BASE_URL } from '../utils/baseUrl';
import useAuthStore from './../store/useAuthStore';


const API_URL = '/api/v1/auth/login';

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(API_BASE_URL+API_URL, {
      email,
      password,
    });

    const { token, userId, userName, role } = response.data;

    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('userName', userName);
    localStorage.setItem('role', role);

    useAuthStore.getState().setAuth(token, userId, userName, role);

    return { token, userId, userName, role };
  } catch (error) {
    console.error('Erro ao fazer login', error);
    throw new Error('Falha no login');
  }
};

export const getToken = () => {
  const tokenFromStore = useAuthStore.getState().token;
  if (tokenFromStore) {
    return tokenFromStore;
  }
  return localStorage.getItem('token'); 
};

export const isAuthenticated = () => {
  return !!getToken();
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('userName');
  localStorage.removeItem('role');

  useAuthStore.getState().clearAuth();
};
