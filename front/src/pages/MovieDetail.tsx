import React from 'react';
import { useLocation } from 'react-router-dom'; // Importando useLocation
import { Movie } from '../types/types';
import Stars from '../components/Stars'; // Importando o componente Stars


const MovieDetail = () => {
  const location = useLocation();
  const { movie } = location.state as { movie: Movie }; // Recebendo o filme passado via state

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{movie.title}</h1>
      <img
        src={movie.imageUrl}
        alt={movie.title}
        className="w-auto h-auto mb-4 rounded shadow"
      />
      <p><strong>Descrição:</strong> {movie.description}</p>
      <p><strong>Diretor:</strong> {movie.director}</p>
      <p><strong>Gênero:</strong> {movie.genre}</p>
      <p><strong>Atores:</strong> {movie.actors.join(', ')}</p>
      <div className="flex items-center mt-4">
        <strong className="mr-2">Média de Votos:</strong>
        <Stars movieId={movie.id} averageVote={Number(movie.averageVote)} />
      </div>
    </div>
  );
};

export default MovieDetail;
