import prisma from '../lib/prisma';
import { di } from '../di/DependenciesLocator';
import { initialData } from './seed';

async function main() {
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  const categories = ['shirts', 'pants', 'hoodies', 'hats'];
  const users = initialData.users
  const products = await di.GetProductsInMemory.execute()
  await prisma.category.createMany({
    data: categories.map((name) => ({ name }))
  });

  await di.CreateProductUseCase.execute(products)
  await di.CreateUserUseCase.execute(users)

  console.log("seed executed. Check database!!");
}

(() => {
  if (process.env.NODE_ENV === 'production') return;

  main()
})();