import { Controller, Get, Param, Patch, Query, UseGuards, NotFoundException, ParseIntPipe, DefaultValuePipe, Body, Req, ForbiddenException } from '@nestjs/common';
import { UserService } from 'src/application/user/user.service';
import { UpdateUserDto } from 'src/application/dtos/update-user.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    @UseGuards(AccessTokenGuard)
    @Get(':id')
    async getUserById(@Param('id', ParseIntPipe) id: number) {
        const user = await this.userService.getUserById(id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    @UseGuards(AccessTokenGuard)
    @Patch(':id')
    async updateUser(
        @Param('id', ParseIntPipe) id: number, 
        @Body() updateUserDto: UpdateUserDto, 
        @Req() req: any
    ) {
        if (req.user.sub !== id && req.user.role !== 'ADMIN') {
            throw new ForbiddenException('You can only update your own profile');
        }
        try {
            return await this.userService.updateUser(id, updateUserDto);
        } catch (error: any) {
            if (error.message === 'User not found') {
                throw new NotFoundException('User not found');
            }
            throw error;
        }
    }

    @UseGuards(AccessTokenGuard, RolesGuard)
    @Roles('ADMIN')
    @Get()
    async getAllUsers(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number
    ) {
        return this.userService.getAllUsers(page, limit);
    }

    @UseGuards(AccessTokenGuard, RolesGuard)
    @Roles('ADMIN')
    @Patch(':id/deactivate')
    async deactivateUser(@Param('id', ParseIntPipe) id: number) {
        const user = await this.userService.getUserById(id);
        if (!user) {
             throw new NotFoundException('User not found');
        }
        await this.userService.deactivateUser(id);
        return { success: true, message: 'User deactivated successfully' };
    }
}
