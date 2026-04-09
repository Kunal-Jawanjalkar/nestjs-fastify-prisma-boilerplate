import { Body, Controller, Post, UseGuards, Req, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from '../../application/auth/auth.service';
import { CreateUserDto } from '../../application/dtos/create-user.dto';
import { LoginDto } from '../../application/dtos/login.dto';
import { RefreshTokenGuard } from '../../common/guards/refreshToken.guard';
import { AccessTokenGuard } from '../../common/guards/accessToken.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(@Req() req: any) {
    await this.authService.logout(req.user.sub);
    return { success: true };
  }

  @UseGuards(RefreshTokenGuard)
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refreshTokens(@Req() req: any) {
    const userId = req.user.sub;
    const refreshToken = req.user.refreshToken;
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
