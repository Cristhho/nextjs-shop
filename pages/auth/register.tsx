import { NextPage } from 'next';
import NextLink from 'next/link';
import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';

import { AuthLayout } from '../../components/layouts';

const RegisterPage: NextPage = () => {
  return (
    <AuthLayout title='Ingresar'>
      <Box sx={{width: 350, padding: '10px 20px'}}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant='h1' component='h1'>Registrarse</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='nombre completo'
              variant='filled'
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='correo'
              variant='filled'
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='contraseña'
              type='password'
              variant='filled'
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button color='secondary' className='circular-btn' size='large' fullWidth>Ingresar</Button>
          </Grid>
          <Grid item xs={12} sx={{textAlign: 'right'}}>
            <NextLink href='/auth/login' passHref>
              <Link underline='always'>¿Ya tienes cuenta?</Link>
            </NextLink>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  );
}

export default RegisterPage;