export interface CreateRatingDTO {
    movieId: number;
    userId: number;
    vote: number;
    comment?: string | null;
  }

  export interface UpdateRatingDTO {
    vote: number;
    comment?: string | null;
  }
  
  export interface RatingResponseDTO {
    id: number;
    movieId: number;
    userId: number;
    vote: number;
    createdAt: Date;
  }

  export interface RatingDTO {
    movieId: string;
    userId: string;
    rating: number;
    comment?: string | null;
    createdAt?: Date;
    
  }

  export const validateRatingVote = (vote: number): boolean => {
    return vote >= 0 && vote <= 4;
  };
  