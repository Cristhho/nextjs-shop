import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Divider, Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { AccountCircleOutlined, ConfirmationNumberOutlined, EscalatorWarningOutlined, FemaleOutlined, LoginOutlined, MaleOutlined, SearchOutlined, VpnKeyOutlined } from '@mui/icons-material';

import { AuthContext, UiContext } from '../../context';
import { AdminMenuOptions } from './AdminMenuOptions';

export const SideMenu = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { isMenuOpen, toggleSideMenu } = useContext(UiContext);
  const { user, logout } = useContext(AuthContext);
  const router = useRouter();

  const navigateTo = (url: string) => {
    toggleSideMenu();
    router.push(url);
  };

  const onSearchHandler = () => {
    if (searchTerm.trim().length === 0) return;

    navigateTo(`/search/${searchTerm}`);
  }

  return (
    <Drawer
      open={ isMenuOpen }
      anchor='right'
      sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
      onClose={() => toggleSideMenu()}
    >
      <Box sx={{ width: 250, paddingTop: 5 }}>
        <List>
          <ListItem>
            <Input
              autoFocus
              value={searchTerm}
              type='text'
              placeholder="Buscar..."
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={onSearchHandler}
                  >
                  <SearchOutlined />
                  </IconButton>
                </InputAdornment>
              }
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' ? onSearchHandler() : null}
            />
          </ListItem>
          <ListSubheader sx={{ display: { xs: '', sm: 'none' } }}>Categorías</ListSubheader>
          <ListItem
            button
            sx={{ display: { xs: '', sm: 'none' } }}
            onClick={() => navigateTo('/category/men')}
          >
            <ListItemIcon>
              <MaleOutlined/>
            </ListItemIcon>
            <ListItemText primary={'Hombres'} />
          </ListItem>
          <ListItem
            button
            sx={{ display: { xs: '', sm: 'none' } }}
            onClick={() => navigateTo('/category/women')}
          >
            <ListItemIcon>
              <FemaleOutlined/>
            </ListItemIcon>
            <ListItemText primary={'Mujeres'} />
          </ListItem>
          <ListItem
            button
            sx={{ display: { xs: '', sm: 'none' } }}
            onClick={() => navigateTo('/category/kid')}
          >
            <ListItemIcon>
              <EscalatorWarningOutlined/>
            </ListItemIcon>
            <ListItemText primary={'Niños'} />
          </ListItem>
          <Divider sx={{ display: { xs: '', sm: 'none' } }} />
          {
            user ?
            (
              <>
                <ListItem button>
                  <ListItemIcon>
                    <AccountCircleOutlined/>
                  </ListItemIcon>
                  <ListItemText primary={'Perfil'} />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <ConfirmationNumberOutlined/>
                  </ListItemIcon>
                  <ListItemText primary={'Mis Ordenes'} />
                </ListItem>
                <ListItem button onClick={logout}>
                  <ListItemIcon>
                    <LoginOutlined/>
                  </ListItemIcon>
                  <ListItemText primary={'Salir'} />
                </ListItem>
                {
                  user.role === 'admin' && (
                    <AdminMenuOptions />
                  )
                }
              </>
            )
            : (
              <ListItem
                button
                onClick={() => navigateTo(`/auth/login?p=${router.asPath}`)}
              >
                <ListItemIcon>
                  <VpnKeyOutlined/>
                </ListItemIcon>
                <ListItemText primary={'Ingresar'} />
              </ListItem>
            )
          }
        </List>
      </Box>
    </Drawer>
  );
}