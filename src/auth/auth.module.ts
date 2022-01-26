import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwStrategy } from './jwt.strategy';

@Module({
  imports: [
    /* needed imports for setting up jws in nestjs */
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      /* should be store in the enviroment variable */
      secret: 'topSecret51',
      signOptions: {
        /* expires in 1 hour or 3600 seconds */
        expiresIn: 3600,
      },
    }),
    TypeOrmModule.forFeature([UsersRepository]),
  ],
  providers: [AuthService, JwStrategy],
  controllers: [AuthController],
  // allow other modules to use the auth logic
  exports: [JwStrategy, PassportModule],
})
export class AuthModule {}
