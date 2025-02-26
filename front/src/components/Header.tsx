import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from './../store/useAuthStore';
import { logout } from './../services/authService';

export const Header = () => {
  const { role, token, userName  } = useAuthStore()
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const isLoggedIn = !!token;
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleMouseEnter = () => {
    setIsDropdownVisible(true);
  };

  const handleSearchFocus = () => {
    navigate('/movie-list');
  };

  return (
    <header className="bg-text text-primaryBg px-5 py-3 flex items-center justify-between fixed top-0 w-full z-10 shadow-lg">
      <a href="/" className="text-accent font-bold text-lg">
        Storm
      </a>

      <div className="flex-grow mx-4 sm:mx-8">
        <input
          type="text"
          placeholder="Busque por filmes, séries ou celebridades..."
          className="w-full p-2 rounded-lg border border-gray-300 focus:ring focus:ring-accent outline-none"
          onFocus={handleSearchFocus}
        />
      </div>

      <nav className="flex items-center space-x-4">
        {!isLoggedIn ? (
          <Link to="/login">
            <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">
              Fazer Login
            </button>
          </Link>
        ) : (
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            ref={dropdownRef}
          >
            <button
              className="text-white py-2 px-4 rounded-lg hover:text-accent transition duration-300 flex items-center"
              onClick={() => setIsDropdownVisible((prev) => !prev)} // Alterna o dropdown ao clicar
            >
              {userName!.split(' ')[0]}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`ml-2 h-5 w-5 transition-transform ${
                  isDropdownVisible ? 'rotate-180' : 'rotate-0'
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isDropdownVisible && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl transition-opacity duration-500">
                <a
                  href="#profile"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Meu Perfil
                </a>
                {role === 'ADMIN' && (
                  <>
                    <Link
                      to="/user-list"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      listar Users
                    </Link>
                    <Link
                      to="/add-user"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Adicionar usuário
                    </Link>
                    <Link
                      to="/add-movie"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Adicionar filme
                    </Link>
                  </>
                )}
                <button
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Sair
                </button>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};
