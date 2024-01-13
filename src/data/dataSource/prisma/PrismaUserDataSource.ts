import bcrypt from 'bcryptjs';

import { CreatedUser, PaginationOptions, PaginationResponse, User } from '@/domain/model';
import { UserDataSource } from '../UserDataSource';
import prisma from '../../../lib/prisma';

export class PrismaUserDataSource implements UserDataSource {

  createManyUsers(users: User[]): Promise<boolean> {
    return new Promise(async (res, rej) => {
      await prisma.user.createMany({
        data: users
      });
      res(true)
    })
  }

  async getByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })

    return user
  }

  async createUser(name: string, email: string, password: string): Promise<CreatedUser> {
    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: bcrypt.hashSync(password)
      },
      select: {
        id: true,
        name: true,
        email: true
      }
    })

    return user
  }

  async getWithPagination({page, take}: PaginationOptions): Promise<PaginationResponse<User>> {
    const users = await prisma.user.findMany({
      take,
      skip: (page! - 1) * take!,
      orderBy: {
        name: 'asc'
      },
    })
    const totalUsers = await prisma.user.count()
    const totalPages = Math.ceil(totalUsers / take!)
    return {
      currentPage: page || 1,
      totalPages: totalPages,
      items: users
    }
  }
}