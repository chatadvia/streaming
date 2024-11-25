export interface CreateUserDTO {
    name: string;
    email: string;
    password: string;
    role: 'ADMIN' | 'USER';
  }
  
  export interface UpdateUserDTO {
    name?: string;
    email?: string;
    password?: string;
    role?: 'ADMIN' | 'USER';
    active?: boolean;
    ratings?: { 
      movieId: number; 
      vote: number; 
      comment?: string; // Comentário opcional
    }[]; 
  }
  
  export interface UserResponseDTO {
    id: number;
    name: string;
    email: string;
    role: 'ADMIN' | 'USER';
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
  }
  