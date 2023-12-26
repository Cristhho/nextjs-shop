import prisma from "../lib/prisma";
import { CategoryRepositoryImpl, ProductRepositoryImpl } from "../data/repository";
import { PrismaCategoryDataSource, PrismaProductDataSource, ProductInMemory } from "../data/dataSource";
import { GetProductsUseCase } from "../domain/useCase";

const memoryProductRepository = new ProductRepositoryImpl(new ProductInMemory());
const prismaCategoryRespository = new CategoryRepositoryImpl(new PrismaCategoryDataSource());
const prismaProductRepository = new ProductRepositoryImpl(new PrismaProductDataSource(prismaCategoryRespository));
const getMemoryProducts = new GetProductsUseCase(memoryProductRepository);

async function main() {
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  const categories = ['shirts', 'pants', 'hoodies', 'hats'];
  const products = await getMemoryProducts.execute();
  await prisma.category.createMany({
    data: categories.map((name) => ({ name }))
  });

  await prismaProductRepository.saveMany(products)

  console.log("seed executed. Check database!!");
}

(() => {
  if (process.env.NODE_ENV === 'production') return;

  main()
})();