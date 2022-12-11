import { BadRequestException, Injectable } from '@nestjs/common';
import BasicUser from './domain/BasicUser';
import SignupRequest from './dto/request/SignupRequest';
import SignupResponse from './dto/response/SignupResponse';
import { UserRepository } from './UserRepository';
import * as bcrypt from 'bcrypt';
import { PrismaInstance } from '../common/PrismaInstance';
import { ImageUploader } from '../common/ImageUploader';
import SigninResponse from './dto/response/SigninResponse';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly prisma: PrismaInstance,
    private readonly imageUploader: ImageUploader,
  ) {}

  public async signupBasicUser(request: SignupRequest) {
    let result: SignupResponse;
    await this.prisma.$transaction(async (tx) => {
      this.comparePassword(request.password, request.passwordConfirmation);
      const checkEmail = await this.userRepository.findUserByEmail(request.email, tx);
      if (checkEmail) {
        throw new BadRequestException('중복된 Email입니다.');
      }
      const checkNickname = await this.userRepository.findUserByNickname(request.nickname, tx);
      if (checkNickname) {
        throw new BadRequestException('중복된 Nickname입니다.');
      }
      const user = BasicUser.new(request.email, request.nickname, bcrypt.hashSync(request.password, 11));
      const savedUser = await this.userRepository.save(user, tx);
      result = new SignupResponse(savedUser);
    });
    return result;
  }

  public async updateProfileImage(file: Express.Multer.File, userId: number) {
    let result: SigninResponse;
    const { path } = await this.imageUploader.uploadImage(file);

    await this.prisma.$transaction(async (tx) => {
      const user = await this.userRepository.findUserById(userId, tx);
      user.setAvatar(path);

      const savedUser = await this.userRepository.save(user, tx);
      result = new SigninResponse(savedUser);
    });

    return result;
  }

  private comparePassword(password: string, passwordConfirmation: string) {
    if (password !== passwordConfirmation) {
      throw new BadRequestException('password와 password confirmation 불일치');
    }
  }
}
