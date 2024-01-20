import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { RoleType } from '../../../constants';
import { Auth, AuthUser } from '../../../decorators';
import { FormatResponseInterceptor } from '../../../interceptors/format-response-interceptor.service';
import { AdminLoginDto } from '../dtos/admin-login.dto';
import { LoginPayloadDto } from '../dtos/login-payload.dto';
import { AdminEntity } from '../entities/admin.entity';
import { AuthService } from '../services/auth.service';

@Controller('admin/auth')
@ApiTags('admin-auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FormatResponseInterceptor)
  async adminLogin(@Body() adminLoginDto: AdminLoginDto) {
    const user = await this.authService.validateUser(adminLoginDto);

    const accessToken = await this.authService.createAccessToken({
      userId: user.id,
      role: RoleType.ADMIN,
    });

    return new LoginPayloadDto(user, accessToken);
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @Auth([RoleType.ADMIN])
  getCurrentUser(@AuthUser() admin: AdminEntity) {
    return admin;
  }
}
