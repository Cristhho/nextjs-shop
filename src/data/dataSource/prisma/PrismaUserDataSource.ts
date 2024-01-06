import { User } from '@/domain/model';
import { UserDataSource } from '../UserDataSource';
import prisma from '../../../lib/prisma';

export class PrismaUserDataSource implements UserDataSource {

  createManyProducts(users: User[]): Promise<boolean> {
    return new Promise(async (res, rej) => {
      await prisma.user.createMany({
        data: users
      });
      res(true)
    })
  }
}