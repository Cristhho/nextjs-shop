import { Category } from '@/domain/model';
import prisma from '../../../lib/prisma';
import { CategoryDataSource } from '../CategoryDataSource';

export class PrismaCategoryDataSource implements CategoryDataSource {

  async getByName(name: string) {
    const category = await prisma.category.findUnique({
      where: {
        name: name.toLowerCase()
      }
    })
    return new Promise<Category>((res, rej) => {
      if (category) res(category)
      else rej('Category not found')
    })
  }

}