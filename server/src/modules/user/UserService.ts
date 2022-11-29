import { BadRequestException, Injectable } from '@nestjs/common';
import BasicUser from './domain/BasicUser';
import SignupRequest from './dto/request/SignupRequest';
import SignupResponse from './dto/response/SignupResponse';
import { UserRepository } from './UserRepository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  public async signupBasicUser(request: SignupRequest) {
    this.comparePassword(request.password, request.passwordConfirmation);
    const checkEmail = await this.userRepository.findUserByEmail(request.email);
    if (checkEmail) {
      throw new BadRequestException('중복된 Email입니다.');
    }
    const checkNickname = await this.userRepository.findUserByNickname(request.nickname);
    if (checkNickname) {
      throw new BadRequestException('중복된 Nickname입니다.');
    }
    const user = BasicUser.new(request.email, request.nickname, bcrypt.hashSync(request.password, 11));
    const savedUser = await this.userRepository.save(user);
    return new SignupResponse(savedUser);
  }

  private comparePassword(password: string, passwordConfirmation: string) {
    if (password !== passwordConfirmation) {
      throw new BadRequestException('password와 password confirmation 불일치');
    }
  }
}
