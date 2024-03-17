import prisma from '../lib/prisma';
import { initialData } from './seed';
import { countries } from './seed-countries';
import { diInstance } from '@/di/CompositionRoot';
import { CreateCountryUseCase, CreateProductUseCase, CreateUserUseCase, GetProductsUseCase } from '@/domain/useCase';

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
  const getProductsUseCase = diInstance.get<GetProductsUseCase>(GetProductsUseCase);
  const createProductUseCase = diInstance.get<CreateProductUseCase>(CreateProductUseCase);
  const createUserUseCase = diInstance.get<CreateUserUseCase>(CreateUserUseCase);
  const createCountryUseCase = diInstance.get<CreateCountryUseCase>(CreateCountryUseCase);
  const products = await getProductsUseCase.execute('memory')
  await prisma.category.createMany({
    data: categories.map((name) => ({ name }))
  });

  await createProductUseCase.execute(products)
  await createUserUseCase.execute(users)
  await createCountryUseCase.execute(countries)

  console.log("seed executed. Check database!!");
}

(() => {
  if (process.env.NODE_ENV === 'production') return;

  main()
})();