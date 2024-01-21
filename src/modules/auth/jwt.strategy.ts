import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import _ from 'lodash';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { ApiConfigService } from '../../shared/services/api-config.service';
import { type UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ApiConfigService,
    private userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.authConfig.secretKey,
    });
  }

  async validate(args: { ci: string; tokenFor: string }): Promise<UserEntity> {
    const user = await this.userService.findOne({ ci: args.ci as never });

    if (!user) {
      throw new UnauthorizedException();
    }

    return _.extend(user, { tokenFor: args.tokenFor });
  }
}
