import { Injectable } from '@nestjs/common';
import { AuthRepository } from './AuthRepository';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  getUserById(id: number) {
    return this.authRepository.getById(id);
  }
}
