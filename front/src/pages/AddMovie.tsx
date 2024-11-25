import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveMovie } from './../services/movieService';
import InputField from './../components/InputField';
import useForm from './../hooks/useForm ';

const AddMovie = () => {
  const { formData, handleInputChange, handleFileChange, resetForm } = useForm();
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);
  const navigate = useNavigate();

  const validateImage = (file: File) => {
    const validFormats = ['image/png', 'image/jpeg'];
    if (!validFormats.includes(file.type)) {
      setImageError('Por favor, envie uma imagem no formato PNG ou JPG.');
      return false;
    }
    setImageError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        throw new Error('ID do usuário não encontrado.');
      }

      const formattedData = {
        ...formData,
        actors: formData.actors.split(',').map((actor) => actor.trim()),
      };

      const formDataToSend = new FormData();
      formDataToSend.append('title', formattedData.name);
      formDataToSend.append('genre', formattedData.genre);
      formDataToSend.append('director', formattedData.director);
      formDataToSend.append('actors', JSON.stringify(formattedData.actors));
      formDataToSend.append('description', formattedData.description);
      if (formattedData.imageUrl && validateImage(formattedData.imageUrl)) {
        formDataToSend.append('imageUrl', formattedData.imageUrl);
      } else {
        setLoading(false);
        return;
      }

      const savedMovie = await saveMovie(userId, formDataToSend);
      alert('Filme cadastrado com sucesso!');

      navigate('/movie-detail', { state: { movie: savedMovie } });

      resetForm();
    } catch (error: any) {
      alert(error?.response?.data?.message || 'Erro ao salvar filme.');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file && !validateImage(file)) {
      return;
    }
    handleFileChange(e);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Cadastro de Filme</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          name="name"
          placeholder="Nome"
          value={formData.name}
          onChange={handleInputChange}
        />
        <InputField
          name="director"
          placeholder="Diretor"
          value={formData.director}
          onChange={handleInputChange}
        />
        <InputField
          name="genre"
          placeholder="Gênero"
          value={formData.genre}
          onChange={handleInputChange}
        />
        <InputField
          name="actors"
          placeholder="Atores (separados por vírgula)"
          value={formData.actors}
          onChange={handleInputChange}
        />
        <InputField
          name="descrição"
          placeholder="Breve sinopse do filme"
          value={formData.description}
          onChange={handleInputChange}
        />
        <div>
          <input
            type="file"
            name="imageUrl"
            onChange={handleImageChange}
            className="border p-2 rounded w-full"
          />
          {imageError && <p className="text-red-500 text-sm">{imageError}</p>}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-green-500 text-white p-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? 'Salvando...' : 'Cadastrar'}
        </button>
      </form>
    </div>
  );
};

export default AddMovie;
