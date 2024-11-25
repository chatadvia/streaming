// src/services/authService.ts
import axios from 'axios';
import { API_BASE_URL } from '../utils/baseUrl';
import useAuthStore from './../store/useAuthStore';


const API_URL = '/api/v1/auth/login'; // URL base de login

// Função para fazer login
export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(API_BASE_URL+API_URL, {
      email,
      password,
    });

    // Se o login for bem-sucedido, salva o token e userId no localStorage
    const { token, userId, userName, role } = response.data;

    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('userName', userName);
    localStorage.setItem('role', role);

    useAuthStore.getState().setAuth(token, userId, userName, role);

    return { token, userId, userName, role }; // Retorna os dados para uso posterior
  } catch (error) {
    console.error('Erro ao fazer login', error);
    throw new Error('Falha no login');
  }
};

// Função para obter o token salvo
export const getToken = () => {
  const tokenFromStore = useAuthStore.getState().token;
  if (tokenFromStore) {
    return tokenFromStore; // Retorna o token da store, se disponível
  }
  return localStorage.getItem('token'); 
};

// Função para verificar se o usuário está autenticado
export const isAuthenticated = () => {
  return !!getToken(); // Retorna true se o token existir
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('userName');
  localStorage.removeItem('role');

  useAuthStore.getState().clearAuth(); // Limpa os dados de autenticação na store
};
