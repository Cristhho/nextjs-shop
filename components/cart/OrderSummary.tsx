import { FC, useContext } from 'react';
import { Grid, Typography } from '@mui/material';

import { CartContext } from '../../context';
import { Currency } from '../../utils';

type Summary = {
  numberOfItems: number,
  subTotal: number,
  tax: number,
  total: number
}
type Props = {
  summary?: Summary
}

export const OrderSummary: FC<Props> = ({ summary }) => {
  const { numberOfItems, subTotal, tax, total } = useContext(CartContext);

  const mItems = summary ? summary.numberOfItems : numberOfItems;

  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>No. productos</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography>{mItems} producto{mItems > 1 && 's'}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Subtotal</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography>{Currency.format(summary ? summary.subTotal : subTotal)}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Impuestos ({Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}%)</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography>{Currency.format(summary ? summary.tax : tax)}</Typography>
      </Grid>
      <Grid item xs={6} sx={{mt: 2}}>
        <Typography variant='subtitle1'>Total</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end' sx={{mt: 2}}>
        <Typography variant='subtitle1'>{Currency.format(summary ? summary.total : total)}</Typography>
      </Grid>
    </Grid>
  )
}
