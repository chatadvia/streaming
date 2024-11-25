export class Favorite {
    constructor(
      public readonly id: string,
      public readonly userId: string,
      public readonly movieId: string,
      public readonly createdAt: Date
    ) {}
  
    static create(userId: string, movieId: string): Favorite {
      return new Favorite(
        crypto.randomUUID(),
        userId,
        movieId,
        new Date()
      );
    }
  }
  