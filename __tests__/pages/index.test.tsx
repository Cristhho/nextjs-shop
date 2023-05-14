import { beforeEach, describe, it } from '@jest/globals';
import { render, screen, waitFor, within } from '@testing-library/react';

import Home from '@/pages/index';

jest.mock('@/domain/useCase', () => ({
  GetProductsUseCase: jest.fn().mockImplementation(() => ({
    excecute: () => {
      return new Promise<any[]>((resolve, _) => {
        resolve([{slug: 'product-a', title: 'ProductA', images: [''], price: 0.00}]);
      });
    }
  }))
}));

describe('<Home />', () => {
  describe('when the Home page is mounted', () => {
    beforeEach(() => {
      render(<Home />);
    })
  
    it('must display the title and subtitle', () => {
      expect(screen.getByRole('heading', { name: /Inicio/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /Todos los productos/i })).toBeInTheDocument();
    });
  
    it('must show the loading text', () => {
      expect(screen.getByRole('heading', { name: /Cargando/i })).toBeInTheDocument();
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });
  });


  describe('wait for the data to be received and', () => {
    it('remove the loading spin', async () => {
      render(<Home />);
      const loading = screen.getByRole('progressbar');
  
      await waitFor(() =>
        expect(loading).not.toBeInTheDocument()
      );
    });
  
    it('shows a list of products', async () => {
      let topContainer: HTMLElement;
      const { container } = render(<Home />);
      topContainer = container;
  
      await waitFor(() =>
        expect(screen.queryByRole('progressbar')).toBeNull()
      );
  
      const productsContainer = topContainer.querySelector<HTMLElement>('.MuiGrid-root.MuiGrid-container');
      const products = within(productsContainer!).queryAllByRole('link');
      expect(products).toHaveLength(1);
    });
  });
});

