import { ApiProperty } from '@nestjs/swagger';

import { AdminDto } from './admin.dto';
import { TokenPayloadDto } from './token-payload.dto';

export class LoginPayloadDto {
  @ApiProperty({ type: AdminDto })
  user: AdminDto;

  @ApiProperty({ type: TokenPayloadDto })
  token: TokenPayloadDto;

  constructor(user: AdminDto, token: TokenPayloadDto) {
    this.user = user;
    this.token = token;
  }
}
