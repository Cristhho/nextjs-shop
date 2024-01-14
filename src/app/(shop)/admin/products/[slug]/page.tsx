import { Title } from '@/components';
import { di } from '@/di/DependenciesLocator';
import { redirect } from 'next/navigation';
import { ProductForm } from './ui/ProductForm';

interface Props {
  params: {
    slug: string;
  }
}

export default async function ProductPage({ params }: Props) {

  const { slug } = params;

  const [ product, categories ] = await Promise.all([
    di.GetProductBySlugUseCase.execute(slug),
    di.GetAllCategoriesUseCase.execute()
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