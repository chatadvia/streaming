import axios from 'axios';
import { API_BASE_URL } from '../utils/baseUrl';
import { Movie } from '../types/types';
import { getAuthToken } from './../utils/tokenUtils';

export const fetchMovies = async (): Promise<Movie[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/movies`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar filmes:', error);
    throw error;
  }
};

export const fetchMovieDetails = async (id: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}//api/v1/movies/${id}`, {
      headers: {
        Authorization: getAuthToken(),
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar detalhes do filme:', error);
    throw error;
  }
};

export const saveMovie = async (userId: string, movieData: Record<string, any>) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/v1/movies/${userId}`, movieData, {
      headers: {
        Authorization: getAuthToken(),
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao salvar filme:', error);
    throw error;
  }
};

export const rateMovie = async (movieId: string, userId: string, rating: number) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/v1/movies/rate/vote`,
      { movieId, userId, rating },
      {
        headers: {
          Authorization: getAuthToken(),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Erro ao enviar a avaliação:', error);
    throw error;
  }
};