import { useContext, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { AppBar, Badge, Box, Button, IconButton, Input, InputAdornment, Link, Toolbar, Typography } from '@mui/material';
import { ClearOutlined, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';

import { UiContext } from '../../context';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);
  const { toggleSideMenu } = useContext(UiContext);
  const { asPath, push } = useRouter();

  const onSearchHandler = () => {
    if (searchTerm.trim().length === 0) return;

    push(`/search/${searchTerm}`);
  }

  return (
    <AppBar>
      <Toolbar>
        <NextLink href='/' passHref>
          <Link display='flex' alignItems='center'>
            <Typography variant='h6'>Teslo | </Typography>
            <Typography sx={{ ml: 0.5 }}>Shop</Typography>
          </Link>
        </NextLink>
        <Box flex={1} />
        <Box sx={{
          display: isSearchVisible ? 'none' : {
            xs: 'none',
            sm: 'block'
          }
        }}>
          <NextLink href='/category/men' passHref>
            <Link>
              <Button color={`${asPath === '/category/men' ? 'primary' : 'info'}`}>Hombres</Button>
            </Link>
          </NextLink>
          <NextLink href='/category/women' passHref>
            <Link>
              <Button color={`${asPath === '/category/women' ? 'primary' : 'info'}`}>Mujeres</Button>
            </Link>
          </NextLink>
          <NextLink href='/category/kid' passHref>
            <Link>
              <Button color={`${asPath === '/category/kid' ? 'primary' : 'info'}`}>Niños</Button>
            </Link>
          </NextLink>
        </Box>
        <Box flex={1} />
        {
          isSearchVisible
          ?
            <Input
              sx={{
                display: {
                  xs: 'none',
                  sm: 'flex'
                }
              }}
              className='fadeIn'
              autoFocus
              value={searchTerm}
              type='text'
              placeholder="Buscar..."
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={() => setIsSearchVisible(false)}
                  >
                  <ClearOutlined />
                  </IconButton>
                </InputAdornment>
              }
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' ? onSearchHandler() : null}
            />
          :
            <IconButton
              className='fadeIn'
              sx={{
                display: {
                  xs: 'none',
                  sm: 'flex'
                }
              }}
              onClick={() => setIsSearchVisible(true)}
            >
              <SearchOutlined />
            </IconButton>
        }

        <IconButton
          sx={{ display: { xs: 'flex', sm: 'none' } }}
          onClick={toggleSideMenu}
        >
          <SearchOutlined />
        </IconButton>
        <NextLink href='/cart' passHref>
          <Link>
            <IconButton>
              <Badge badgeContent={2} color='secondary'>
                <ShoppingCartOutlined />
              </Badge>
            </IconButton>
          </Link>
        </NextLink>
        <Button onClick={() => toggleSideMenu()}>
          Menú
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar;