export const revalidate = 60;
import { redirect } from 'next/navigation';

import { Pagination, ProductGrid, Title } from '@/components';
import { di } from '@/di/DependenciesLocator';

interface Props {
  searchParams: {
    page?: string; 
  }
}

export default async function Home({ searchParams }: Props) {
  const page = searchParams.page ? parseInt( searchParams.page ) : 1;
  const { items: products, totalPages } = await di.GetPaginatedProductsUseCase.execute({ page })

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

      <Pagination totalPages={ totalPages } />
      
    </>
  );
}
