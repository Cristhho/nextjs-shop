export const revalidate = 60;
import { redirect } from 'next/navigation';

import { ProductGrid, Title } from '@/components';
import { PrismaProductDataSource } from '@/data/dataSource';
import { ProductRepositoryImpl } from '@/data/repository';
import { GetPaginatedProductsUseCase } from '@/domain/useCase';

interface Props {
  searchParams: {
    page?: string; 
  }
}

const productsRepository = new ProductRepositoryImpl(new PrismaProductDataSource())
const productsUseCase = new GetPaginatedProductsUseCase(productsRepository)

export default async function Home({ searchParams }: Props) {
  const page = searchParams.page ? parseInt( searchParams.page ) : 1;
  const { items: products, currentPage, totalPages } = await productsUseCase.execute({ page })

  if ( products.length === 0 ) {
    redirect('/');
  }

  return (
    <>
      <Title
        title="Tienda"
        subtitle="Todos los productos"
        className="mb-2"
      />

      <ProductGrid 
        products={ products }
      />
      
    </>
  );
}
