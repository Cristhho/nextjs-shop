import { initialData } from "./seed";
import prisma from "../lib/prisma";

async function main() {
  await Promise.all([
    prisma.productImage.deleteMany(),
    prisma.product.deleteMany(),
    prisma.category.deleteMany(),
  ]);

  const { categories, products } = initialData;
  await prisma.category.createMany({
    data: categories.map((name) => ({ name }))
  });

  console.log("seed executed. Check database!!");
}

(() => {
  if (process.env.NODE_ENV === 'production') return;

  main()
})();