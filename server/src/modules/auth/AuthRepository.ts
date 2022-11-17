import { Injectable } from '@nestjs/common';
import { PrismaInstance } from '../common/PrismaInstance';

@Injectable()
export class AuthRepository {
  constructor(private readonly prismaInstance: PrismaInstance) {}

  public getById(id: number) {
    return this.prismaInstance.user.findFirst({
      where: { user_id: id },
    });
  }

  public getByOAuthId(oauthId: string) {
    return this.prismaInstance.user.findFirst({
      where: { OauthUser: { oauth_id: oauthId } },
    });
  }

  public async create(oauth: { oauth_id: number; oauth_type: string }, email: string) {
    const data = {
      OauthUser: {
        oauth_id: oauth.oauth_id,
        oauth_type: oauth.oauth_type,
      },
      email,
    };

    // TODO: fix this part
    //const user = await this.prismaInstance.user.create({ data });
  }
}
