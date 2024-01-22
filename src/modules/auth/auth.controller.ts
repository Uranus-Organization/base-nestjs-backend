import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Auth, AuthUser } from '../../decorators';
import { UserDto } from '../user/dtos/user.dto';
import { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { UserRegisterDto } from './dtos/user-register.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private userService: UserService, // private authService: AuthService,
  ) {}

  // @Post('login')
  // @HttpCode(HttpStatus.OK)
  // @ApiOkResponse({
  //   type: LoginPayloadDto,
  //   description: 'User info with access token',
  // })
  // async userLogin(
  //   @Body() userLoginDto: UserLoginDto,
  // ): Promise<LoginPayloadDto> {
  //   const userEntity = await this.authService.validateUser(userLoginDto);
  //
  //   const token = await this.authService.createAccessToken({
  //     userId: userEntity.id,
  //     role: RoleType.USER,
  //   });
  //
  //   return new LoginPayloadDto(userEntity.toDto(), token);
  // }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: UserDto, description: 'Successfully Registered' })
  async userRegister(
    @Body() userRegisterDto: UserRegisterDto,
  ): Promise<UserDto> {
    const createdUser = await this.userService.createUser(userRegisterDto);

    return createdUser.toDto();
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @Auth()
  @ApiOkResponse({ type: UserDto, description: 'current user info' })
  getCurrentUser(@AuthUser() user: UserEntity): UserDto {
    return user.toDto();
  }

  @Get('health')
  @HttpCode(HttpStatus.OK)
  @Auth()
  @ApiOkResponse({ type: UserDto, description: 'check authorization' })
  checkAuthorization(@AuthUser() user: UserEntity) {
    return user.toDto();
  }
}
