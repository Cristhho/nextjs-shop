export const revalidate = 60;

import { Pagination, ProductGrid, Title } from '@/components';
import { di } from '@/di/DependenciesLocator';
import { Gender } from '@/domain/model';


interface Props {
  searchParams: {
    page?: string; 
  },
  params: {
    gender: Gender;
  }
}

export default async function GenderPage({ params, searchParams }: Props) {
  const page = searchParams.page ? parseInt( searchParams.page ) : 1;
  const { gender } = params;
  const { items: products, totalPages } = await di.GetPaginatedProductsUseCase.execute({ page, gender, take: 6 })

  const labels: Record<Gender, string>  = {
    'men': 'para hombres',
    'women': 'para mujeres',
    'kid': 'para niños',
    'unisex': 'para todos'
  }

  // if ( id === 'kids' ) {
  //   notFound();
  // }


  return (
    <>
      <Title
        title={`Artículos de ${ labels[gender] }`}
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