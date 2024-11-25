import { Rating } from "./Rating";

export class User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'ADMIN' | 'USER';
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  ratings: Rating[];

  constructor(
    id: string,
    name: string,
    email: string,
    password: string,
    role: 'ADMIN' | 'USER' = 'USER',
    active: boolean = true,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date(),
    ratings: Rating[] = []
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
    this.active = active;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.ratings = ratings;
  }
}
