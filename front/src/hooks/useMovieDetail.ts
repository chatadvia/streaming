import { useEffect, useState } from 'react';
import { fetchMovieDetails } from './../services/movieService';

export const useMovieDetail = (id: string) => {
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMovieDetails = async () => {
      try {
        const data = await fetchMovieDetails(id);
        setMovie(data);
      } catch (err: any) {
        setError(err.message || 'Erro ao buscar detalhes do filme');
      } finally {
        setLoading(false);
      }
    };

    loadMovieDetails();
  }, [id]);

  return { movie, loading, error };
};
