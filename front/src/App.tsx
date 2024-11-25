import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importando o react-router-dom
import { fetchMovies } from './services/movieService';
import { Header } from './components/Header';
import useMovieStore from './store/useMovieStore';
import { SearchProvider } from './context/searchContext';
import { routes } from './routes/routes';


const App: React.FC = () => {
  const { movies, setMovies } = useMovieStore();

  useEffect(() => {
    const getMovies = async () => {
      try {
        const fetchedMovies = await fetchMovies(); // Busca os filmes da API
        setMovies(fetchedMovies); // Atualiza o estado com os filmes obtidos
      } catch (error) {
        console.error('Erro ao buscar filmes:', error);
      }
    };

    getMovies(); // Invoca a função para buscar filmes
  }, []); // Executa o efeito apenas uma vez após o primeiro render

  return (
    <SearchProvider>
      <Router> {/* Envolvendo a aplicação com Router */}
        <div className="App">
        <Header />
          <Routes> {/* Routes permite renderizar apenas uma rota */}
            {routes.map(({ path, element, key }) => (
              <Route key={key} path={path} element={element} />
            ))}
          </Routes>
        </div>
      </Router>
    </SearchProvider>
  );
};

export default App;
