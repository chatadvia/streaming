import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { User } from '../types/types';
import useMovieStore from './../store/useMovieStore';

const UserDetail = () => {
  const location = useLocation();
  const user: User = location.state.user; 

  const { movies } = useMovieStore();

  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({ ...user });
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const userMovies = user.ratings.map((rating) => {
    const movie = movies.find((m) => m.id === rating.movieId);
    return {
      id: rating.movieId,
      title: movie?.title || 'Filme não encontrado',
      rating: rating.rating,
      comment: rating.comment,
    };
  });

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'newPassword') {
      setNewPassword(value);
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
    }
  };

  const toggleEditMode = () => {
    setIsEditing((prev) => !prev);
  };

  const handleSave = async () => {
    if (newPassword && newPassword !== confirmPassword) {
      alert('As senhas não coincidem.');
      return;
    }
    
    alert('Alterações salvas com sucesso!');
    setIsEditing(false);
    setNewPassword('');
    setConfirmPassword('');
  };

  const toggleUserStatus = () => {
    const newStatus = !updatedUser.active;
    setUpdatedUser({ ...updatedUser, active: newStatus });
    alert(`Usuário agora está ${newStatus ? 'ativo' : 'inativo'}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{user.name}</h1>
      <img
        src={user.imageUrl || 'https://via.placeholder.com/150'}
        alt={user.name}
        className="w-32 h-32 object-cover rounded-full mb-4 mx-auto"
      />
      <p>
        <strong>E-mail:</strong>{' '}
        {isEditing ? (
          <input
            type="email"
            name="email"
            value={updatedUser.email}
            onChange={handleEditChange}
            className="border p-2 rounded"
          />
        ) : (
          user.email
        )}
      </p>
      <p>
        <strong>Cargo:</strong>{' '}
        {isEditing ? (
          <input
            type="text"
            name="role"
            value={updatedUser.role}
            onChange={handleEditChange}
            className="border p-2 rounded"
          />
        ) : (
          user.role
        )}
      </p>
      <p>
        <strong>Status:</strong> {updatedUser.active ? 'Ativo' : 'Inativo'}
      </p>
      <p>
        <strong>Data de Criação:</strong> {new Date(user.createdAt).toLocaleDateString()}
      </p>
      <p>
        <strong>Última Atualização:</strong> {new Date(user.updatedAt).toLocaleDateString()}
      </p>

      {isEditing && (
        <>
          <div className="mt-4">
            <label className="block">
              <strong>Nova Senha:</strong>
              <input
                type="password"
                name="newPassword"
                value={newPassword}
                onChange={handlePasswordChange}
                className="border p-2 rounded w-full"
              />
            </label>
            <label className="block mt-2">
              <strong>Confirmar Senha:</strong>
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handlePasswordChange}
                className="border p-2 rounded w-full"
              />
            </label>
          </div>
        </>
      )}

      <div className="mt-4 space-x-4">
        <button
          onClick={toggleEditMode}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {isEditing ? 'Cancelar Edição' : 'Editar'}
        </button>
        {isEditing && (
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Salvar Alterações
          </button>
        )}
      </div>

      <div className="mt-4">
        <button
          onClick={toggleUserStatus}
          className={`px-4 py-2 rounded ${updatedUser.active ? 'bg-red-500' : 'bg-green-500'} text-white`}
        >
          {updatedUser.active ? 'Desativar Usuário' : 'Ativar Usuário'}
        </button>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4">Filmes Avaliados</h2>
        {userMovies.length > 0 ? (
          <ul className="space-y-4">
            {userMovies.map((movie) => (
              <li key={movie.id} className="p-4 border rounded shadow-sm">
                <p>
                  <strong>Título:</strong> {movie.title}
                </p>
                <p>
                  <strong>Nota:</strong> {movie.rating}
                </p>
                <p>
                  <strong>Comentário:</strong> {movie.comment || 'Sem comentário'}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Nenhum filme avaliado ainda.</p>
        )}
      </div>
    </div>
  );
};

export default UserDetail;
