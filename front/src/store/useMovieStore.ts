import { create } from 'zustand'
import { Movie } from '../types/types';

interface MovieStore {
  movies: Movie[];
  setMovies: (movies: Movie[]) => void;
  clearMovies: () => void;
}

const useMovieStore = create<MovieStore>((set) => ({
  movies: [],
  setMovies: (movies: Movie[]) => set({ movies }),
  clearMovies: () => set({ movies: [] }),
}));

export default useMovieStore;
