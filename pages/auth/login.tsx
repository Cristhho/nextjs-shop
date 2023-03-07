import { useEffect, useState } from 'react';
import { NextPage, GetServerSideProps } from 'next';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { getProviders, getSession, signIn } from 'next-auth/react';
import { Box, Button, Chip, Divider, Grid, Link, TextField, Typography } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import { useForm } from 'react-hook-form';

import { AuthLayout } from '../../components/layouts';
import { Validations } from '../../utils';

type FormData = {
  email: string,
  password: string,
};

const LoginPage: NextPage = () => {
  const [showError, setShowError] = useState<boolean>(false);
  const [providers, setProviders] = useState<any>({});
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  useEffect(() => {
    getProviders().then((prov) => {
      setProviders(prov);
    });
  }, []);
  

  const onLoginUser = async ({ email, password }: FormData) => {
    setShowError(false);
    /*const isValidLogin = await loginUser(email, password);
    if (!isValidLogin) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
      return;
    }
    const destination = router.query.p?.toString() || '/';
    router.replace(destination);*/
    signIn('credentials', { email, password });
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
              <NextLink href={`/auth/register?p=${router.query.p?.toString() || '/'}`} passHref>
                <Link underline='always'>¿No tienes cuenta?</Link>
              </NextLink>
            </Grid>
            <Grid item xs={12} display='flex' flexDirection='column' justifyContent='flex-end'>
              <Divider sx={{ width: '100%', mb: 2 }} />
              {
                Object.values(providers).map((prov: any) => {
                  if (prov.id === 'credentials') return null;
                  return (
                    <Button
                      key={prov.id}
                      variant='outlined'
                      fullWidth
                      color='primary'
                      sx={{ mb: 1 }}
                      onClick={() => signIn(prov.id)}
                    >
                      {prov.name}
                    </Button>
                  );
                })
              }
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
}

export const getServerSideProps:GetServerSideProps = async ({ req, query }) => {
  const session = await getSession({ req });
  const {p = '/'} = query;
  if (session) {
    return {
      redirect: {
        destination: p.toString(),
        permanent: false
      }
    };
  }

  return {
    props: {}
  };
}

export default LoginPage;