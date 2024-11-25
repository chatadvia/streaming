// utils/authUtils.ts

export const getAuthToken = (): string => {
    const token = localStorage.getItem('token');
    return token ? `Bearer ${token}` : '';
  };
  