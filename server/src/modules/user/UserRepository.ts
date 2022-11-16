import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaInstance } from '../common/PrismaInstance';
import BasicUser from './domain/BasicUser';
import OauthUser from './domain/OauthUser';
import User from './domain/User';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaInstance) {}

  async save(user: User): Promise<User> {
    if (user.userId) {
      return await this.update(user);
    } else {
      return await this.create(user);
    }
  }

  async create(user: User): Promise<User> {
    const newUser = await this.prisma.user.create({
      data: {
        nickname: user.nickname,
        avatar: user.nickname,
        created_at: user.createdAt,
        updated_at: user.updatedAt,
      },
    });
    if (user instanceof BasicUser) {
      await this.prisma.basicUser.create({
        data: {
          user_id: newUser.user_id,
          email: (user as BasicUser).email,
          password: (user as BasicUser).password,
        },
      });
    } else if (user instanceof OauthUser) {
      await this.prisma.oauthUser.create({
        data: {
          user_id: newUser.user_id,
          oauth_id: (user as OauthUser).oauthId,
          oauth_type: (user as OauthUser).oauthType,
        },
      });
    } else {
      await this.prisma.user.delete({
        where: {
          user_id: newUser.user_id,
        },
      });
      throw new InternalServerErrorException('허용되지 않은 User의 등록 시도');
    }
    user.setId(newUser.user_id);
    return user;
  }

  async update(user: User) {
    await this.prisma.user.update({
      where: {
        user_id: user.userId,
      },
      data: {
        nickname: user.nickname,
        avatar: user.avatar,
        updated_at: user.updatedAt,
      },
    });
    return user;
  }
}
