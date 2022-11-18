import { BadRequestException, Injectable } from '@nestjs/common';
import BasicUser from './domain/BasicUser';
import SignupRequest from './dto/request/SignupRequest';
import SignupResponse from './dto/response/SignupResponse';
import { UserRepository } from './UserRepository';
import * as bcrypt from 'bcrypt';
import SSOSigninRequest from './dto/request/SSOSigninRequest';
import OauthUser from './domain/OauthUser';
import OauthType from './enum/OauthType';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  public async signupBasicUser(request: SignupRequest) {
    this.comparePassword(request.password, request.passwordConfirmation);
    const user = BasicUser.new(request.email, request.nickname, bcrypt.hashSync(request.password, 11));
    const savedUser = await this.userRepository.save(user);
    return new SignupResponse(savedUser);
  }

  public async signupOAuthUser(request: SSOSigninRequest) {
    const { oauthType, oauthId } = request;
    const user = OauthUser.new(OauthType[`${oauthType}`], oauthId);
    const savedUser = await this.userRepository.save(user);
    return new SignupResponse(savedUser);
  }

  private comparePassword(password: string, passwordConfirmation: string) {
    if (password !== passwordConfirmation) {
      throw new BadRequestException('password와 password confirmation 불일치');
    }
  }
}
