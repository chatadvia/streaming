import { Rating } from "./Rating";

export class Movie {
    id: number;
    title: string;
    genre: string;
    director: string;
    actors: string[];
    averageVote: number = 0;
    description: string;
    imageUrl?: string;
    createdAt: Date;
    updatedAt: Date;
  
    constructor(
      id: number,
      title: string,
      genre: string,
      director: string,
      averageVote: number,
      actors: string[],
      description: string,
      createdAt: Date,
      updatedAt: Date,
      imageUrl?: string
    ) {
      this.id = id;
      this.title = title;
      this.genre = genre;
      this.director = director;
      this.averageVote = averageVote;
      this.actors = actors;
      this.description = description;
      this.imageUrl = imageUrl;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }

    calculateAverageVote(ratings: Rating[]): void {
      if (ratings.length > 0) {
        this.averageVote = ratings.reduce((sum, rating) => sum + rating.vote, 0) / ratings.length;
      }
    }
  }
  