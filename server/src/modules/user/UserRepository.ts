import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaInstance } from '../common/PrismaInstance';
import BasicUser from './domain/BasicUser';
import OauthUser from './domain/OauthUser';
import User from './domain/User';
import OauthType from './enum/OauthType';

type UserType = User | BasicUser | OauthUser;

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaInstance) {}

  async save(user: UserType): Promise<UserType> {
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
        avatar: user.avatar,
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

  async findUserById(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        user_id: userId,
      },
    });
    if (!user) {
      return null;
    }
    return User.of(user);
  }

  async findUserByNickname(nickname: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        nickname,
      },
    });
    if (!user) {
      return null;
    }
    return User.of(user);
  }

  async findUserByEmail(email: string): Promise<BasicUser> {
    const basicUser = await this.prisma.basicUser.findUnique({
      where: {
        email,
      },
      include: {
        User: true,
      },
    });
    if (!basicUser) {
      return null;
    }
    return BasicUser.basicOf(basicUser);
  }

  async findUserByOauth(oauthId: string, oauthType: OauthType) {
    const oauthUser = await this.prisma.oauthUser.findUnique({
      where: {
        oauth_type_oauth_id: {
          oauth_id: oauthId,
          oauth_type: oauthType,
        },
      },
      include: {
        User: true,
      },
    });
    if (!oauthUser) {
      return null;
    }
    return OauthUser.oauthOf(oauthUser);
  }
}
