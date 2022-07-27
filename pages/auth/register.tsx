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
  name: string,
  email: string,
  password: string
}

const RegisterPage: NextPage = () => {
  const [showError, setShowError] = useState<boolean>(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onResigterUser = async (formData: FormData) => {
    setShowError(false);
    try {
      const { data } = await tesloApi.post('/user/register', formData);
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
      <form onSubmit={handleSubmit(onResigterUser)}>
        <Box sx={{width: 350, padding: '10px 20px'}}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='h1' component='h1'>Crear cuenta</Typography>
              {
                showError &&
                  <Chip
                    label='Tiene errores en el formulario'
                    color='error'
                    icon={<ErrorOutline />}
                    className='fadeIn'
                  />
              }
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='nombre completo'
                variant='filled'
                fullWidth
                {...register('name' , {
                  required: 'Este campo es requerido',
                  minLength: {
                    value: 2,
                    message: 'Mínimo 2 caracteres'
                  }
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='correo'
                variant='filled'
                type='email'
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
              <NextLink href='/auth/login' passHref>
                <Link underline='always'>¿Ya tienes cuenta?</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
}

export default RegisterPage;