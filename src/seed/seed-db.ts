import { initialData } from "./seed";
import prisma from "../lib/prisma";

async function main() {
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  const { categories, products } = initialData;
  await prisma.category.createMany({
    data: categories.map((name) => ({ name }))
  });

  const categoriesDB = await prisma.category.findMany();
  const categoriesMap = categoriesDB.reduce((map, category) => {
    map[category.name.toLowerCase()] = category.id
    return map;
  }, {} as Record<string, string>);

  products.forEach(async (product) => {
    const {images, type, ...$product} = product;
    const dbProduct = await prisma.product.create({
      data: {
        ...$product,
        categoryId: categoriesMap[type.toLowerCase()]
      }
    });
    const $images = images.map((image) => ({
      url: image,
      productId: dbProduct.id
    }));

    await prisma.productImage.createMany({
      data: $images
    })
  })

  console.log("seed executed. Check database!!");
}

(() => {
  if (process.env.NODE_ENV === 'production') return;

  main()
})();