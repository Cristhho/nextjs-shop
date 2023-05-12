import { beforeEach, describe, it } from '@jest/globals';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import Navbar from '@/components/ui/Navbar';

describe('<Navbar />', () => {
  it('renders without changes', () => {
    const { asFragment } = render(<Navbar />);
    expect(asFragment()).toMatchSnapshot();
  });

  describe('when Navbar component is mounted', () => {
    beforeEach(() => {
      render(<Navbar />);
    });

    it('shows the home link', () => {
    const homeLink = screen.getByRole('link', {
      name: /teslo \| shop/i
      });
  
      expect(homeLink).toBeInTheDocument();
    });
  
    it('shows the menu links', () => {
      const linksContainer = screen.getByRole('navigation');
      expect(linksContainer).toBeInTheDocument();
  
      const links = within(linksContainer).getAllByRole('link');
      expect(links).toHaveLength(3);

      const [men, women, children] = links;
      expect(men).toHaveTextContent(/Hombres/i);
      expect(women).toHaveTextContent(/Mujeres/i);
      expect(children).toHaveTextContent(/Niños/i);
    });

    it('must be a Search Button', () => {
      const search = screen.getByLabelText('Search');
      expect(search).toBeInTheDocument();
    })
  });

  describe('when the user clicks the search button', () => {
    it('the navbar links shouldn\'t be visible and the search input appears', async () => {
      render(<Navbar />);

      expect(screen.queryByRole('navigation')).toBeInTheDocument();

      userEvent.click(screen.getByLabelText('Search'));

      await waitFor(() =>
        expect(screen.queryByRole('navigation')).toBeNull()
      );

      expect(screen.getByPlaceholderText(/Buscar/i)).toBeInTheDocument();
    });
  });

});
