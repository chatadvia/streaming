import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User } from '../types/types';
import { fetchUsers } from '../services/userService'; // Função de serviço para buscar usuários

const UsersList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({ name: '', email: '', role: '' });

  // Função para buscar usuários da API
  const getUsers = async () => {
    try {
      const usersData = await fetchUsers(); // Chama a função do serviço
      setUsers(usersData);
      setLoading(false);
    } catch (error: any) {
      setError('Erro ao buscar usuários');
      setLoading(false);
    }
  };

  // UseEffect para chamar a função ao carregar o componente
  useEffect(() => {
    getUsers();
  }, []);

  // Atualiza os filtros
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value.toLowerCase() }));
  };

  // Aplica os filtros aos usuários
  const filteredUsers = users.filter((user: User) => {
    return (
      (filters.name ? user.name.toLowerCase().includes(filters.name) : true) &&
      (filters.email ? user.email.toLowerCase().includes(filters.email) : true) &&
      (filters.role ? user.role.toLowerCase().includes(filters.role) : true)
    );
  });

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Listagem de Usuários</h1>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <input
          name="name"
          placeholder="Nome"
          value={filters.name}
          onChange={handleFilterChange}
          className="border p-2 rounded"
        />
        <input
          name="email"
          placeholder="E-mail"
          value={filters.email}
          onChange={handleFilterChange}
          className="border p-2 rounded"
        />
        <input
          name="role"
          placeholder="Cargo"
          value={filters.role}
          onChange={handleFilterChange}
          className="border p-2 rounded"
        />
      </div>
      <p className="text-gray-600 mb-4">
        Mostrando {filteredUsers.length} usuários encontrados.
      </p>
      {filteredUsers.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredUsers.map((user: User) => (
            <Link
              to={`/user-detail`} // Rota para os detalhes do usuário
              key={user.id}
              state={{ user }} // Passa o usuário como state
              className="cursor-pointer border p-4 rounded shadow hover:shadow-lg transition"
            >
              <h2 className="text-lg font-bold text-center">{user.name}</h2>
              <p className="text-sm text-gray-700 text-center">{user.email}</p>
              <p className="text-sm text-gray-700 text-center">
                Cargo: {user.role}
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <p className="mt-4">Nenhum usuário encontrado.</p>
      )}
    </div>
  );
};

export default UsersList;
