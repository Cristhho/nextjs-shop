import prisma from '../lib/prisma';
import { di } from '../di/DependenciesLocator';
import { initialData } from './seed';
import { countries } from './seed-countries';

async function main() {
  await prisma.orderAddress.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.address.deleteMany();
  await prisma.user.deleteMany();
  await prisma.country.deleteMany();

  const categories = ['shirts', 'pants', 'hoodies', 'hats'];
  const users = initialData.users
  const products = await di.GetProductsInMemory.execute()
  await prisma.category.createMany({
    data: categories.map((name) => ({ name }))
  });

  await di.CreateProductUseCase.execute(products)
  await di.CreateUserUseCase.execute(users)
  await di.CreateCountryUseCase.execute(countries)

  console.log("seed executed. Check database!!");
}

(() => {
  if (process.env.NODE_ENV === 'production') return;

  main()
})();