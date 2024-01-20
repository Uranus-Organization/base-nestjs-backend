import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { validateHash } from '../../../common/utils';
import { type RoleType, TokenType } from '../../../constants';
import { UserNotFoundException } from '../../../exceptions';
import { ApiConfigService } from '../../../shared/services/api-config.service';
import { type AdminLoginDto } from '../dtos/admin-login.dto';
import { TokenPayloadDto } from '../dtos/token-payload.dto';
import { AdminEntity } from '../entities/admin.entity';
import {AdminDto} from "../dtos/admin.dto";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ApiConfigService,
    @InjectRepository(AdminEntity)
    private userRepository: Repository<AdminEntity>,
  ) {}

  async createAccessToken(data: {
    role: RoleType;
    userId: string;
  }): Promise<TokenPayloadDto> {
    return new TokenPayloadDto({
      expiresIn: this.configService.authConfig.jwtExpirationTime,
      accessToken: await this.jwtService.signAsync({
        userId: data.userId,
        type: TokenType.ACCESS_TOKEN,
        role: data.role,
      }),
    });
  }

  async validateUser(userLoginDto: AdminLoginDto): Promise<AdminDto> {
    const user = await this.userRepository.findOneBy({
      email: userLoginDto.email,
    });

    const isPasswordValid = await validateHash(
      userLoginDto.password,
      user?.password,
    );

    if (!isPasswordValid || !user) {
      throw new UserNotFoundException();
    }

    return user.toDto();
  }
}
