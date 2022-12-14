import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaInstance } from '../common/PrismaInstance';
import BasicUser from './domain/BasicUser';
import OauthUser from './domain/OauthUser';
import User from './domain/User';
import OauthType from './enum/OauthType';
import TestPaper from '../testPaper/domain/TestPaper';
import Test from '../test/domain/Test';
import WorkbookTest from '../test/domain/WorkbookTest';
import Workbook from '../workbook/domain/Workbook';
import WorkbookQuestion from '../workbook/domain/WorkbookQuestion';
import Question from '../question/domain/Question';

type UserType = User | BasicUser | OauthUser;

@Injectable()
export class UserRepository {
  constructor(private prismaInstance: PrismaInstance) {}

  async save(user: UserType, tx?: Prisma.TransactionClient): Promise<UserType> {
    if (user.userId) {
      return await this.update(user, tx);
    } else {
      return await this.create(user, tx);
    }
  }

  async create(user: User, tx?: Prisma.TransactionClient): Promise<User> {
    const prisma = tx ? tx : this.prismaInstance;
    const newUser = await prisma.user.create({
      data: {
        nickname: user.nickname,
        avatar: user.avatar,
        created_at: user.createdAt,
        updated_at: user.updatedAt,
      },
    });
    if (user instanceof BasicUser) {
      await prisma.basicUser.create({
        data: {
          user_id: newUser.user_id,
          email: (user as BasicUser).email,
          password: (user as BasicUser).password,
        },
      });
    } else if (user instanceof OauthUser) {
      await prisma.oauthUser.create({
        data: {
          user_id: newUser.user_id,
          oauth_id: (user as OauthUser).oauthId,
          oauth_type: (user as OauthUser).oauthType,
        },
      });
    } else {
      await prisma.user.delete({
        where: {
          user_id: newUser.user_id,
        },
      });
      throw new InternalServerErrorException('허용되지 않은 User의 등록 시도');
    }
    user.setId(newUser.user_id);
    return user;
  }

  async update(user: User, tx?: Prisma.TransactionClient) {
    const prisma = tx ? tx : this.prismaInstance;
    await prisma.user.update({
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

  async findUserById(userId: number, tx?: Prisma.TransactionClient) {
    const prisma = tx ? tx : this.prismaInstance;
    const user = await prisma.user.findUnique({
      where: {
        user_id: userId,
      },
    });
    if (!user) {
      return null;
    }
    return User.of(user);
  }

  async findUserByNickname(nickname: string, tx?: Prisma.TransactionClient) {
    const prisma = tx ? tx : this.prismaInstance;
    const user = await prisma.user.findUnique({
      where: {
        nickname,
      },
    });
    if (!user) {
      return null;
    }
    return User.of(user);
  }

  async findUserByEmail(email: string, tx?: Prisma.TransactionClient): Promise<BasicUser> {
    const prisma = tx ? tx : this.prismaInstance;
    const basicUser = await prisma.basicUser.findUnique({
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

  async findUserByOauth(oauthId: string, oauthType: OauthType, tx?: Prisma.TransactionClient) {
    const prisma = tx ? tx : this.prismaInstance;
    const oauthUser = await prisma.oauthUser.findUnique({
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

  async getMyData(userId: bigint) {
    // TODO: "무조건" 여기 개선하기, 상당히 마음에 들지 않지만, 우선 기능 구현을 위해 작성
    const data = await this.prismaInstance.user.findUnique({
      where: {
        user_id: userId,
      },
      include: {
        Test: {
          include: {
            TestPaper: {
              include: {
                TestPaperQuestion: true,
              },
            },
            WorkbookTest: {
              include: {
                Workbook: {
                  include: {
                    WorkbookQuestion: {
                      include: {
                        Question: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        Workbook_UserToWorkbook_user_id: true,
      },
    });

    const workbookCount = data.Workbook_UserToWorkbook_user_id.length;
    const testCount = data.Test.length;
    const testPaperCount = data.Test.reduce((acc, curr) => (acc += curr.TestPaper.length), 0);
    const reviews = data.Test.reduce((acc, curr) => {
      const test = Test.of(curr);
      test.setWorkbooks(
        curr.WorkbookTest.map((wt) => {
          const workbook = Workbook.of(wt.Workbook);
          workbook.setQuestions(
            wt.Workbook.WorkbookQuestion.map((wq) => WorkbookQuestion.of(wq, Question.of(wq.Question))),
          );
          return WorkbookTest.of(wt, workbook);
        }),
      );
      const reviewPaper = curr.TestPaper.filter((tp) => tp.state === 'COMPLETE').map((tp) => ({
        testPaper: tp,
        test,
      }));
      acc.push(...reviewPaper);
      return acc;
    }, []).map((rp) => TestPaper.of(rp.testPaper, rp.test));
    return {
      workbookCount,
      testCount,
      testPaperCount,
      reviewCount: reviews.length,
      reviews,
    };
  }
}
