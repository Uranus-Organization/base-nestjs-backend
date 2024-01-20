import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import _ from 'lodash';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { RoleType, TokenType } from '../../constants';
import { ApiConfigService } from '../../shared/services/api-config.service';
import { type AdminEntity } from '../admin/entities/admin.entity';
import { AdminService } from '../admin/services/admin.service';
import { type UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ApiConfigService,
    private userService: UserService,
    private adminService: AdminService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.authConfig.publicKey,
    });
  }

  async validate(args: {
    userId: string;
    role: RoleType;
    type: TokenType;
  }): Promise<UserEntity | AdminEntity> {
    if (args.type !== TokenType.ACCESS_TOKEN) {
      throw new UnauthorizedException();
    }

    if (args.role === RoleType.USER) {
      const user = await this.userService.findOne({ id: args.userId as never});

      if (!user) {
        throw new UnauthorizedException();
      }

      return _.extend(user, { role: args.role });
    }

    const admin = await this.adminService.findOne({
      id: args.userId as never,
      role: args.role,
    });

    if (!admin) {
      throw new UnauthorizedException();
    }

    return _.extend(admin, { role: args.role });
  }
}
