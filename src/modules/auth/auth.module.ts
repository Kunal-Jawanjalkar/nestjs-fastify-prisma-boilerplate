import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '../../presentation/auth/auth.controller';
import { AuthService } from '../../application/auth/auth.service';
import { AccessTokenStrategy } from '../../common/strategies/accessToken.strategy';
import { RefreshTokenStrategy } from '../../common/strategies/refreshToken.strategy';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    UserModule,
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
})
export class AuthModule {}
