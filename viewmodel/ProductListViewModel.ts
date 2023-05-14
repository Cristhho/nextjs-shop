import { useCallback, useMemo, useState } from 'react';

import { Product } from '@/domain/model';
import { ProductRepository } from '@/domain/repository';
import { GetProductsUseCase } from '@/domain/useCase';

export const useProductListViewModel = (productRepository: ProductRepository) => {
  const [products, setProducts] = useState<Product[] | undefined>();
  const [error, setError] = useState<string>('');

  const useCase = useMemo(() => new GetProductsUseCase(productRepository), [productRepository]);

  const getProducts = useCallback(async () => {
    try {
      const data = await useCase.excecute('all');
      setProducts(data);
    } catch (error: any) {
      setError(error.message);
    }
  }, [useCase]);

  return {
    getProducts,
    isLoading: !products && !error,
    products: products || [],
    error
  }
}