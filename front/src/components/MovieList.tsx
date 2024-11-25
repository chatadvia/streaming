// MovieList.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from './MovieCard';
import { Movie } from '../types/types';
import classNames from '../utils/cnMerge';

const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch('http://localhost:3000/movies');
      const data: Movie[] = await response.json();
      setMovies(data);
    };
    fetchMovies();
  }, []);

  return (
    <div
      className={classNames(
        'grid',
        'grid-cols-1',
        'sm:grid-cols-2',
        'md:grid-cols-3',
        'lg:grid-cols-4',
        'gap-6',
        'p-5',
        'mt-16',
      )}
    >
       {movies.map((movie) => (
        <Link key={movie.id} to={`/movie/${movie.id}`}> {/* Adicionando o Link com o ID do filme */}
          <MovieCard movie={movie} />
        </Link>
      ))}
    </div>
  );
};

export default MovieList;
