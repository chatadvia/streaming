import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from './../store/useAuthStore';
import RatingModal from './RatingModal'; // Importa o componente do modal

interface StarsProps {
  averageVote: number;
  onRate?: (rating: number) => void;
  isRating?: boolean;
  movieId: string; // Adicionando o movieId como prop
}

const Stars: React.FC<StarsProps> = ({ averageVote, onRate, isRating = false, movieId }) => {
  const navigate = useNavigate();
  const { token, userId } = useAuthStore();
  const isLoggedIn = !!token;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRating, setSelectedRating] = useState<number>(0);

  const totalStars = 4;
  const filledStars = Math.floor(averageVote);
  const hasHalfStar = averageVote % 1 !== 0;

  const handleRate = (rating: number) => {
    setSelectedRating(rating); // Define o rating selecionado
    setIsModalOpen(true); // Abre o modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Fecha o modal
  };

  const handleRatingSubmit = () => {
    if (onRate) {
      onRate(selectedRating); // Envia o rating via callback
    }
    console.log(`Rating submitted: ${selectedRating}`);
    setIsModalOpen(false); // Fecha o modal após envio
  };

  const handleStarClickNotLogin = () => {
    navigate('/login'); // Redireciona para login
    return;
  };

  return (
    <div className="flex flex-col items-center">
      {/* Renderização das estrelas */}
      <div className="flex">
        {Array.from({ length: totalStars }, (_, index) => {
          const isFilled = index < filledStars;
          const isHalf = index === filledStars && hasHalfStar;
          const starClass = isFilled || isHalf ? 'text-yellow-500' : 'text-gray-300';

          return (
            <button
              key={index}
              className={`${starClass} focus:outline-none text-3xl mx-1`}
              onClick={() => {
                if (isLoggedIn) {
                  handleRate(index + 1); // Abre o modal
                } else {
                  handleStarClickNotLogin(); // Redireciona para login
                }
              }}
              aria-label={`Rate ${index + 1} stars`}
            >
              {isHalf ? '✩' : '★'}
            </button>
          );
        })}
      </div>

      {/* Modal */}
      <RatingModal
        isOpen={isModalOpen}
        initialRating={selectedRating}
        movieId={movieId} // Passando o movieId para o modal
        userId={userId!} // Passando o userId para o modal
        onClose={handleCloseModal}
        onSubmit={handleRatingSubmit}
      />
    </div>
  );
};

export default Stars;
