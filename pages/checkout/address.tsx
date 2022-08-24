import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Box, Button, FormControl, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';

import ShopLayout from '../../components/layouts/ShopLayout';
import { countries } from '../../utils';

type FormData = {
  name: string,
  lastname: string,
  address: string,
  address2: string,
  zip: string,
  city: string,
  country: string,
  phone: string
}

const getAddressFromCookie = (): FormData => {
  const addressCookie = Cookies.get('address') ? JSON.parse(Cookies.get('address')!) : {};
  return addressCookie;
}

const AddressPage: NextPage = () => {
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: getAddressFromCookie()
  });

  useEffect(() => {
    setLoaded(true);
  }, []);
  

  const onSubmitAddress = (data: FormData) => {
    Cookies.set('address', JSON.stringify(data));
    router.push('/checkout/summary');
  }

  if (!loaded) return <></>;

  return (
    <ShopLayout
      title='Dirección'
      pageDescription='Confirmar dirección de destino'
    >
      <Typography variant='h1' component='h1'>Dirección</Typography>
      <Grid container spacing={2} sx={{mt: 2}}>
        <Grid item xs={12} sm={6}>
          <TextField
            label='nombre'
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
        <Grid item xs={12} sm={6}>
          <TextField
            label='apellido'
            variant='filled'
            fullWidth
            {...register('lastname' , {
              required: 'Este campo es requerido',
              minLength: {
                value: 2,
                message: 'Mínimo 2 caracteres'
              }
            })}
            error={!!errors.lastname}
            helperText={errors.lastname?.message}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label='dirección'
            variant='filled'
            fullWidth
            {...register('address' , {
              required: 'Este campo es requerido',
              minLength: {
                value: 2,
                message: 'Mínimo 2 caracteres'
              }
            })}
            error={!!errors.address}
            helperText={errors.address?.message}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label='dirección 2 (opcional)'
            variant='filled'
            fullWidth
            {...register('address2')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label='código postal'
            variant='filled'
            fullWidth
            {...register('zip' , {
              required: 'Este campo es requerido',
              minLength: {
                value: 2,
                message: 'Mínimo 2 caracteres'
              }
            })}
            error={!!errors.zip}
            helperText={errors.zip?.message}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label='ciudad'
            variant='filled'
            fullWidth
            {...register('city' , {
              required: 'Este campo es requerido',
              minLength: {
                value: 2,
                message: 'Mínimo 2 caracteres'
              }
            })}
            error={!!errors.city}
            helperText={errors.city?.message}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              select
              variant='filled'
              label='pais'
              defaultValue={ JSON.parse(Cookies.get('address') || '{}').country || countries[0].code }
              {...register('country' , {
                required: 'Este campo es requerido',
              })}
              error={!!errors.country}
            >
              {
                countries.map((country) => (
                  <MenuItem key={country.code} value={country.code}>{country.name}</MenuItem>
                ))
              }
            </TextField>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label='teléfono'
            variant='filled'
            fullWidth
            {...register('phone' , {
              required: 'Este campo es requerido',
              minLength: {
                value: 2,
                message: 'Mínimo 2 caracteres'
              }
            })}
            error={!!errors.phone}
            helperText={errors.phone?.message}
          />
        </Grid>
      </Grid>

      <Box sx={{mt: 5}} display='flex' justifyContent='center'>
        <Button
          color='secondary'
          className='circular-btn'
          size='large'
          onClick={handleSubmit(onSubmitAddress)}
        >Revisar pedido</Button>
      </Box>
    </ShopLayout>
  );
}

export default AddressPage;