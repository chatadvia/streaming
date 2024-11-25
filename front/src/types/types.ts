export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  active: boolean;
  ratings: Rating[];
  favorites: Favorite[];
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface Movie {
  id: string;
  title: string;
  genre: string;
  director: string;
  actors: string[];
  averageVote: number;
  ratings: Rating[];
  favorites: Favorite[];
  description: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Favorite {
  id: string;
  userId: string;
  movieId: string;
  createdAt: string;
  user: User;
  movie: Movie;
}

export interface Rating {
  id: string;
  movieId: string;
  userId: string;
  rating: number;
  comment?: string;
  createdAt: string;
  movie: Movie;
  user: User;
}

export interface CreateUserForm {
  name: string;
  email: string;
  password: string;
  role: Role;
}

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}


export interface AuthStore {
  token: string | null;
  userId: string | null;
  userName: string | null;
  role: string | null;
  setAuth: (token: string, userId: string, userName: string, role: string) => void;
  clearAuth: () => void;
}

