export class Rating {
    id: string;
    movieId: number;
    userId: number;
    vote: number;
    comment?: string;
    createdAt: Date;
  
    constructor(
      id: string,
      movieId: number,
      userId: number,
      vote: number,
      comment: string,
      createdAt: Date
    ) {

      if (!this.isValidVote(vote)) {
        throw new Error('Invalid vote. Vote must be between 0 and 4.');
      }

      this.id = id;
      this.movieId = movieId;
      this.userId = userId;
      this.vote = vote;
      this.comment = comment;
      this.createdAt = createdAt;
    }

    private isValidVote(vote: number): boolean {
      return vote >= 0 && vote <= 4;
    }
  }
  