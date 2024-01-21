import { Controller, Get, HttpCode, HttpStatus, Version } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { RoleType } from '../../constants';
import { Auth, UUIDParam } from '../../decorators';
import { UserDto } from './dtos/user.dto';
import { UserService } from './user.service';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private userService: UserService) {}

  // @Version('1')
  // @Get()
  // @Auth([RoleType.USER])
  // @HttpCode(HttpStatus.OK)
  // @ApiPageOkResponse({
  //   description: 'Get users list',
  //   type: PageDto,
  // })
  // getUsers(
  //   @Query(new ValidationPipe({ transform: true }))
  //   pageOptionsDto: UsersPageOptionsDto,
  // ): Promise<PageDto<UserDto>> {
  //   return this.userService.getUsers(pageOptionsDto);
  // }

  @Version('1')
  @Get(':id')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get users list',
    type: UserDto,
  })
  getUser(@UUIDParam('id') userId: string): Promise<UserDto> {
    return this.userService.getUser(userId);
  }
}
