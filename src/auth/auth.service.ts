import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private userRepository: UsersRepository,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    /* if a database constrain is not meet like username being unic it will throw an error, you can catch it and handle it with a nest error response */
    try {
      return await this.userRepository.createUser(authCredentialsDto);
    } catch (error) {
      const isDuplicateUsername = error.code === '23505';
      if (isDuplicateUsername) {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
