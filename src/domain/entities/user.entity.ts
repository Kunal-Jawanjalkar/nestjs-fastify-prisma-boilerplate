export class User {
  id?: number;
  email!: string;
  firstName!: string;
  lastName!: string;
  password!: string;
  role: string = 'USER';
  refreshToken?: string | null;
  isActive: boolean = true;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
