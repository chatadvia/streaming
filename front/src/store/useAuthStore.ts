import { create } from 'zustand';
import { AuthStore } from './../types/types';


const getAuthFromLocalStorage = () => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const userName = localStorage.getItem('userName');
  const role = localStorage.getItem('role');
  
  return {
    token: token ? token : null,
    userId: userId ? userId : null,
    userName: userName ? userName : null,
    role: role ? role : null
  };
};

const useAuthStore = create<AuthStore>((set) => {
  const { token, userId, userName, role } = getAuthFromLocalStorage();

  return {
    token,
    userId,
    userName,
    role,

    setAuth: (token, userId, userName, role) => {
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      localStorage.setItem('userName', userName);
      localStorage.setItem('role', role);

      set({ token, userId, userName, role });
    },

    clearAuth: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('userName');
      localStorage.removeItem('role');

      set({ token: null, userId: null, userName: null, role: null });
    },
  };
});

export default useAuthStore;
