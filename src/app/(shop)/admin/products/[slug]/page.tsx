import { Title } from '@/components';
import { di } from '@/di/DependenciesLocator';
import { redirect } from 'next/navigation';
import { ProductForm } from './ui/ProductForm';
import { diInstance } from '@/di/CompositionRoot';
import { GetAllCategoriesUseCase, GetProductBySlugUseCase } from '@/domain/useCase';

interface Props {
  params: {
    slug: string;
  }
}

export default async function ProductPage({ params }: Props) {

  const { slug } = params;

  const [ product, categories ] = await Promise.all([
    diInstance.get<GetProductBySlugUseCase>(GetProductBySlugUseCase).execute(slug),
    diInstance.get<GetAllCategoriesUseCase>(GetAllCategoriesUseCase).execute()
  ]);
 
  if ( !product && slug !== 'new' ) {
    redirect('/admin/products')
  }

  const title = (slug === 'new') ? 'Nuevo producto' : 'Editar producto'

  return (
    <>
      <Title title={ title } />

      <ProductForm product={product ?? {}} categories={categories} />
    </>
  );
}