import {forwardRef, Module} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ApiConfigService } from '../../shared/services/api-config.service';
import { JwtStrategy } from '../auth/jwt.strategy';
import { PublicStrategy } from '../auth/public.strategy';
import { AuthController } from './controllers/auth.controller';
import { AdminEntity } from './entities/admin.entity';
import { AuthService } from './services/auth.service';
import { AdminService } from './services/admin.service';
import { UserModule } from '../user/user.module';

const services = [AuthService, AdminService];

@Module({
  imports: [
    forwardRef(() => UserModule),
    TypeOrmModule.forFeature([AdminEntity]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: (configService: ApiConfigService) => ({
        privateKey: configService.authConfig.privateKey,
        publicKey: configService.authConfig.publicKey,
        signOptions: {
          algorithm: 'RS256',
          expiresIn: configService.getNumber('JWT_EXPIRATION_TIME'),
        },
        verifyOptions: {
          algorithms: ['RS256'],
        },
      }),
      inject: [ApiConfigService],
    }),
  ],
  controllers: [AuthController],
  exports: [JwtModule, ...services],
  providers: [JwtStrategy, PublicStrategy, ...services],
})
export class AdminModule {}
