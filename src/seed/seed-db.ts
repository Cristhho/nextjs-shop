import prisma from '../lib/prisma';
import { di } from '../di/DependenciesLocator';

async function main() {
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  const categories = ['shirts', 'pants', 'hoodies', 'hats'];
  const products = await di.GetProductsInMemory.execute()
  await prisma.category.createMany({
    data: categories.map((name) => ({ name }))
  });

  await di.CreateProductUseCase.execute(products)

  console.log("seed executed. Check database!!");
}

(() => {
  if (process.env.NODE_ENV === 'production') return;

  main()
})();