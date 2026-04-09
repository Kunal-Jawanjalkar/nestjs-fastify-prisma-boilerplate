import { Injectable } from '@nestjs/common';
import { User } from 'src/domain/entities/user.entity';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';

@Injectable()
export class UserService {
    constructor (private userRepo: UserRepository){
        
    }

    async getUserById(id: number){
        return this.userRepo.findById(id);
    }

    async findByEmail(email: string) {
        return this.userRepo.findByEmail(email);
    }

    async createUser(dto: CreateUserDto){
        const user = new User(dto);
        return this.userRepo.create(user);
    }

    async updateUser(id: number, dto: UpdateUserDto){
        const existingUser = await this.userRepo.findById(id);
        if (!existingUser) {
            throw new Error('User not found');
        }
        const updatedUser = new User({
            ...existingUser,
            ...dto
        });
        return this.userRepo.update(updatedUser);
    }

    async getAllUsers(page: number = 1, limit: number = 10) {
        const skip = (page - 1) * limit;
        return this.userRepo.findAll(skip, limit);
    }

    async deactivateUser(id: number) {
        return this.userRepo.deactivate(id);
    }
}
