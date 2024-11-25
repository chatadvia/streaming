import { useState, useEffect } from 'react';
import { Movie } from '../types/types';
import { fetchMovies } from './../services/movieService';

export const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [filters, setFilters] = useState({
    name: '',
    director: '',
    genre: '',
    actors: '',
  });

  const loadMovies = async () => {
    try {
      const data = await fetchMovies();
      setMovies(data);
      setFilteredMovies(data);
    } catch (error) {
      console.error('Erro ao buscar filmes:', error);
    }
  };

  useEffect(() => {
    loadMovies();
  }, []);

  const handleFilterChange = (name: string, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    const filtered = movies.filter((movie) => {
      return (
        movie.title.toLowerCase().includes(filters.name.toLowerCase()) &&
        movie.director.toLowerCase().includes(filters.director.toLowerCase()) &&
        movie.genre.toLowerCase().includes(filters.genre.toLowerCase()) &&
        movie.actors.some((actor) =>
          actor.toLowerCase().includes(filters.actors.toLowerCase())
        )
      );
    });
    setFilteredMovies(filtered);
  };

  return {
    movies: filteredMovies,
    filters,
    handleFilterChange,
    applyFilters,
    loadMovies,
  };
};
