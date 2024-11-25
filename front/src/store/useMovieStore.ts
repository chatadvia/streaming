// stores/useMovieStore.ts
import { create } from 'zustand'
import { Movie } from '../types/types';

// Definindo a interface para o estado do store
interface MovieStore {
  movies: Movie[];
  setMovies: (movies: Movie[]) => void;
  clearMovies: () => void;
}

// Criando o store Zustand
const useMovieStore = create<MovieStore>((set) => ({
  movies: [], // Inicializa o estado dos filmes como um array vazio
  setMovies: (movies: Movie[]) => set({ movies }), // Atualiza os filmes
  clearMovies: () => set({ movies: [] }), // Limpa os filmes
}));

export default useMovieStore;
