import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Movie } from '../types/types';
import Stars from '../components/Stars';
import { fetchMovieDetails } from './../services/movieService';

const MovieDetail = () => {
  const location = useLocation();
  const { movie } = location.state as { movie: Movie };

  const [movieDetail, setMovieDetail] = useState<Movie>(movie);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const updatedMovie = await fetchMovieDetails(movie.id);
        setMovieDetail(updatedMovie);
      } catch (err) {
        setError('Erro ao buscar detalhes do filme. Por favor, tente novamente.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [movie.id]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{movieDetail.title}</h1>
      <img
        src={movieDetail.imageUrl}
        alt={movieDetail.title}
        className="w-auto h-auto mb-4 rounded shadow"
      />
      <p><strong>Nome:</strong> {movieDetail.title}</p>
      <p><strong>Descrição:</strong> {movieDetail.description}</p>
      <p><strong>Diretor:</strong> {movieDetail.director}</p>
      <p><strong>Gênero:</strong> {movieDetail.genre}</p>
      <p><strong>Atores:</strong> {movieDetail.actors.join(', ')}</p>
      <div className="flex items-center mt-4">
        <strong className="mr-2">Média de Votos:</strong>
        <Stars movieId={movieDetail.id} averageVote={movieDetail.averageVote} />
        <p>{movieDetail.averageVote}</p>
      </div>
    </div>
  );
};

export default MovieDetail;
