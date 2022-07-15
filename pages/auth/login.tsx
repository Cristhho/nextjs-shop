import { useState } from 'react';
import { NextPage } from 'next';
import NextLink from 'next/link';
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import { useForm } from 'react-hook-form';

import { AuthLayout } from '../../components/layouts';
import { Validations } from '../../utils';
import { tesloApi } from '../../api';

type FormData = {
  email: string,
  password: string,
};

const LoginPage: NextPage = () => {
  const [showError, setShowError] = useState<boolean>(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onLoginUser = async ({ email, password }: FormData) => {
    setShowError(false);
    try {
      const { data } = await tesloApi.post('/user/login', { email, password });
      const { token, user } = data;
      console.log(token, user);
    } catch (error) {
      console.log(error);
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
    }
  }

  return (
    <AuthLayout title='Ingresar'>
      <form onSubmit={handleSubmit(onLoginUser)}>
        <Box sx={{width: 350, padding: '10px 20px'}}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='h1' component='h1'>Iniciar sesión</Typography>
              {
                showError &&
                  <Chip
                    label='Usuario o contraseña erroneos'
                    color='error'
                    icon={<ErrorOutline />}
                    className='fadeIn'
                  />
              }
            </Grid>
            <Grid item xs={12}>
              <TextField
                type='email'
                label='correo'
                variant='filled'
                fullWidth
                {...register('email', {
                  required: 'Este campo es requerido',
                  validate: Validations.isEmail
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='contraseña'
                type='password'
                variant='filled'
                fullWidth
                {...register('password', {
                  required: 'Este campo es requerido',
                  minLength: {
                    value: 6,
                    message: 'Mínimo 6 caracteres'
                  }
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type='submit' color='secondary' className='circular-btn' size='large' fullWidth>Ingresar</Button>
            </Grid>
            <Grid item xs={12} sx={{textAlign: 'right'}}>
              <NextLink href='/auth/register' passHref>
                <Link underline='always'>¿No tienes cuenta?</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
}

export default LoginPage;