// MovieCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Movie } from '../types/types';
import cnMerge from '../utils/cnMerge';
import Stars from './Stars';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div
      className={cnMerge(
        'bg-primaryBg',
        'border',
        'border-border',
        'rounded-lg',
        'shadow-md',
        'overflow-hidden',
        'text-center',
      )}
    >
      <Link
        to={`/movie-detail`}
        key={movie.id}
        state={{ movie }} // Passando o objeto do filme como state
      >
        <img
          src={movie.imageUrl}
          alt={`${movie.title} poster`}
          className={cnMerge('w-full', 'h-48', 'object-cover', 'cursor-pointer')}
        />
      </Link>
      <div className="p-4">
        <h3 className={cnMerge('text-text', 'font-bold', 'text-lg')}>
          {movie.title}
        </h3>
        <p className={cnMerge('text-gray-600', 'text-sm', 'mt-2')}>
          {movie.description}
        </p>
        {movie.averageVote && (
          <div className="flex items-center justify-center mt-3">
            <Stars movieId={movie.id} averageVote={Number(movie.averageVote)} /> {/* Mostrando as estrelas */}
            <span className="ml-2 text-lg font-semibold text-text">{movie.averageVote}</span> {/* Mostrando o valor numérico */}
          </div>
        )}
        <button
          className={cnMerge(
            'bg-accent',
            'text-text',
            'px-4',
            'py-2',
            'rounded-lg',
            'mt-4',
            'hover:bg-yellow-500',
          )}
        >
          Details
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
