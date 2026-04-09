import { User } from "../entities/user.entity";

export abstract class UserRepository {
  abstract findById(id: number): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findAll(skip: number, take: number): Promise<{ users: User[]; total: number }>;
  abstract create(user: User): Promise<User>;
  abstract update(user: User): Promise<User>;
  abstract deactivate(id: number): Promise<void>;
}