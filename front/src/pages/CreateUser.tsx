import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Input from "../components/Input";
import Button from "../components/Button";
import { API_BASE_URL } from "../utils/baseUrl";
import { getAuthToken } from "../utils/tokenUtils";
import cnMerge from "./../utils/cnMerge";
import { CreateUserForm, Role } from "./../types/types";
import { createUser } from "./../services/userService";
import { getUserId } from "../utils/userIdUtil";


const CreateUser: React.FC = () => {
  const [formData, setFormData] = useState<CreateUserForm>({
    name: "",
    email: "",
    password: "",
    role: Role.USER, // Inicializando com "USER", mas pode ser alterado pelo select
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const adminId = getUserId(); // Supondo que getUserId esteja retornando o ID corretamente
      await createUser(adminId, formData); // Passando o formData para a criação do usuário

      setMessage("Usuário criado com sucesso!");
      setFormData({ name: "", email: "", password: "", role: Role.USER });

      navigate("/");
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      setMessage("Erro ao criar usuário. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-xl font-bold text-gray-800 mb-4">Criar Novo Usuário</h1>
      {message && (
        <p
          className={cnMerge(
            "text-sm font-medium mb-4",
            message.includes("Erro") ? "text-red-500" : "text-green-500"
          )}
        >
          {message}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Nome"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Digite o nome"
          required
        />

        <Input
          label="E-mail"
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Digite o e-mail"
          required
        />

        <Input
          label="Senha"
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Digite a senha"
          required
        />

        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
            Tipo
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            className="block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-sky-500 focus:outline-none"
          >
            <option value="USER">Usuário</option>
            <option value="ADMIN">Administrador</option>
          </select>
        </div>

        <Button type="submit" loading={loading}>
          Criar Usuário
        </Button>
      </form>
    </div>
  );
};

export default CreateUser;
