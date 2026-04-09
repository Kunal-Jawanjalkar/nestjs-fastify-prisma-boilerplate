import { Module } from '@nestjs/common';
import { UserService } from 'src/application/user/user.service';
import { PrismaUserRepository } from 'src/infrastructure/prisma/repositories/prisma-user.repository';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { UserController } from 'src/presentation/user/user.controller';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';

@Module({
  providers: [
    UserService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    PrismaService
  ],
  controllers:[UserController],
  exports: [UserService]
})
export class UserModule {}

