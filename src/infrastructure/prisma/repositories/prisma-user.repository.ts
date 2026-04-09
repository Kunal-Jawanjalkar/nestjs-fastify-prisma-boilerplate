import { UserRepository } from "src/domain/repositories/user.repository";
import { PrismaService } from "../prisma.service";
import { User } from "src/domain/entities/user.entity";
import { Injectable } from "@nestjs/common";
import { User as PrismaUser } from "../generated/prisma/client.js";

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  private mapToDomain(prismaUser: PrismaUser): User {
    return new User({
      id: prismaUser.id,
      email: prismaUser.email,
      firstName: prismaUser.firstName,
      lastName: prismaUser.lastName,
      password: prismaUser.password,
      role: prismaUser.role,
      createdAt: prismaUser.createdAt,
      updatedAt: prismaUser.updatedAt,
      refreshToken: prismaUser.refreshToken,
      isActive: prismaUser.isActive
    });
  }

  async create(user: User): Promise<User> {
    const created = await this.prisma.user.create({
      data: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password,
        role: user.role as any, // bypassing enum typing issue if any, or letting Prisma infer
        refreshToken: user.refreshToken,
        isActive: user.isActive,
      },
    });
    return this.mapToDomain(created);
  }

  async findById(id: number): Promise<User | null> {
    const prismaUser = await this.prisma.user.findUnique({
      where: { id },
    });
    return prismaUser ? this.mapToDomain(prismaUser) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const prismaUser = await this.prisma.user.findUnique({
      where: { email },
    });
    return prismaUser ? this.mapToDomain(prismaUser) : null;
  }

  async findAll(skip: number, take: number): Promise<{ users: User[]; total: number }> {
    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        skip,
        take,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.user.count(),
    ]);
    return {
      users: users.map((u) => this.mapToDomain(u)),
      total,
    };
  }

  async update(user: User): Promise<User> {
    const updated = await this.prisma.user.update({
      where: { id: user.id },
      data: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password,
        role: user.role as any,
        refreshToken: user.refreshToken,
        isActive: user.isActive,
      },
    });
    return this.mapToDomain(updated);
  }

  async deactivate(id: number): Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data: { isActive: false },
    });
  }
}