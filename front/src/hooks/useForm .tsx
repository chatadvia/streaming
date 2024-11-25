import { useState } from 'react';

const useForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    director: '',
    genre: '',
    actors: '',
    description: '',
    imageUrl: null as File | null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData((prev) => ({ ...prev, imageUrl: file }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      director: '',
      genre: '',
      actors: '',
      description: '',
      imageUrl: null,
    });
  };

  return {
    formData,
    handleInputChange,
    handleFileChange,
    resetForm,
  };
};

export default useForm;
