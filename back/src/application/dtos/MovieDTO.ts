export interface CreateMovieDTO {
    title: string;
    genre: string;
    director: string;
    actors: string | string[];
    description: string;
    imageUrl?: string;
  }
  
  export interface UpdateMovieDTO {
    title?: string;
    genre?: string;
    director?: string;
    actors?: string[];
    description?: string;
    averageVote?: number;
    imageUrl?: string;
  }
  
  export interface MovieResponseDTO {
    id: number;
    title: string;
    genre: string;
    director: string;
    actors: string[];
    imageUrl?: string;
    averageVote:  number;
    description: string;
    createdAt: Date;
    updatedAt: Date;
  }
  