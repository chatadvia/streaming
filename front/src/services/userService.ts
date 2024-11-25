import axios from 'axios';
import { API_BASE_URL } from '../utils/baseUrl';
import { getAuthToken } from '../utils/tokenUtils';
import { User } from '../types/types';


export const createUser = async (id: string, userData: Partial<User>): Promise<User> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/v1/users/admin/${id}`, userData, {
        headers: {
          Authorization: getAuthToken(),
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Erro ao criar o usuário com ID ${id}:`, error);
      throw error;
    }
  };

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/users`, {
      headers: {
        Authorization: getAuthToken(),
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    throw error;
  }
};

export const fetchUserDetails = async (id: string): Promise<User> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/users/${id}`, {
      headers: {
        Authorization: getAuthToken(),
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar detalhes do usuário com ID ${id}:`, error);
    throw error;
  }
};

export const updateUser = async (id: string, userData: Partial<User>): Promise<User> => {
  try {
    const response = await axios.put(`${API_BASE_URL}/api/v1/users/${id}`, userData, {
      headers: {
        Authorization: getAuthToken(),
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar o usuário com ID ${id}:`, error);
    throw error;
  }
};

export const deactivateUser = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/api/v1/users/${id}/deactivate`, {
      headers: {
        Authorization: getAuthToken(),
      },
    });
  } catch (error) {
    console.error(`Erro ao desativar o usuário com ID ${id}:`, error);
    throw error;
  }
};

export const activateUser = async (id: string): Promise<void> => {
  try {
    await axios.put(`${API_BASE_URL}/api/v1/users/${id}/activate`, {
      headers: {
        Authorization: getAuthToken(),
      },
    });
  } catch (error) {
    console.error(`Erro ao desativar o usuário com ID ${id}:`, error);
    throw error;
  }
};
