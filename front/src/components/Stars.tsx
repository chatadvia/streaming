import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from './../store/useAuthStore';
import RatingModal from './RatingModal';

interface StarsProps {
  averageVote: number;
  onRate?: (rating: number) => void;
  isRating?: boolean;
  movieId: string;
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
    setSelectedRating(rating);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleRatingSubmit = () => {
    if (onRate) {
      onRate(selectedRating);
    }
    console.log(`Rating submitted: ${selectedRating}`);
    setIsModalOpen(false); 
  };

  const handleStarClickNotLogin = () => {
    navigate('/login'); 
    return;
  };

  return (
    <div className="flex flex-col items-center">
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
                  handleRate(index + 1);
                } else {
                  handleStarClickNotLogin();
                }
              }}
              aria-label={`Rate ${index + 1} stars`}
            >
              {isHalf ? '✩' : '★'}
            </button>
          );
        })}
      </div>

      <RatingModal
        isOpen={isModalOpen}
        initialRating={selectedRating}
        movieId={movieId}
        userId={userId!}
        onClose={handleCloseModal}
        onSubmit={handleRatingSubmit}
      />
    </div>
  );
};

export default Stars;
