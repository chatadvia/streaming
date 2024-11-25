import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMovies } from './../hooks/useMovies';
import { Movie } from './../types/types';

const MoviesList = () => {
  const { movies } = useMovies(); // Supomos que os filmes já estão carregados
  const [filters, setFilters] = useState({ name: '', director: '', genre: '', actors: '' });

  // Atualiza os filtros
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value.toLowerCase() }));
  };

  // Aplica os filtros aos filmes
  const filteredMovies = movies.filter((movie: Movie) => {
    return (
      (filters.name ? movie.title.toLowerCase().includes(filters.name) : true) &&
      (filters.director ? movie.director.toLowerCase().includes(filters.director) : true) &&
      (filters.genre ? movie.genre.toLowerCase().includes(filters.genre) : true) &&
      (filters.actors
        ? movie.actors.some((actor) => actor.toLowerCase().includes(filters.actors))
        : true)
    );
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Listagem de Filmes</h1>
      <div className="grid grid-cols-4 gap-4 mb-4">
        <input
          name="name"
          placeholder="Nome"
          value={filters.name}
          onChange={handleFilterChange}
          className="border p-2 rounded"
        />
        <input
          name="director"
          placeholder="Diretor"
          value={filters.director}
          onChange={handleFilterChange}
          className="border p-2 rounded"
        />
        <input
          name="genre"
          placeholder="Gênero"
          value={filters.genre}
          onChange={handleFilterChange}
          className="border p-2 rounded"
        />
        <input
          name="actors"
          placeholder="Atores"
          value={filters.actors}
          onChange={handleFilterChange}
          className="border p-2 rounded"
        />
      </div>
      <p className="text-gray-600 mb-4">Mostrando {filteredMovies.length} filmes encontrados.</p>
      {filteredMovies.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredMovies.map((movie: Movie) => (
            <Link
              to={`/movie-detail`} // Rota para a página de detalhes
              key={movie.id}
              state={{ movie }} // Passa o filme como state
              className="cursor-pointer border p-4 rounded shadow hover:shadow-lg transition"
            >
              <img
                src={movie.imageUrl || 'https://via.placeholder.com/150'}
                alt={movie.title}
                className="w-full h-40 object-cover mb-2 rounded"
              />
              <h2 className="text-lg font-bold">{movie.title}</h2>
              <p className="text-sm text-gray-700">Diretor: {movie.director}</p>
              <p className="text-sm text-gray-700">Gênero: {movie.genre}</p>
              <p className="text-sm text-gray-700">
                Atores: {movie.actors.join(', ')}
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <p className="mt-4">Nenhum filme encontrado.</p>
      )}
    </div>
  );
};

export default MoviesList;
