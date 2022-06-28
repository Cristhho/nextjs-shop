import { Box, Typography } from "@mui/material";

import ShopLayout from "../components/layouts/ShopLayout";

const NotFoundPage = () => {
  return (
    <ShopLayout
      title='Página no encontrada'
      pageDescription='Nada que mostrar aquí'
    >
      <Box
        display='flex'
        flexDirection={{ xs: 'column', md: 'row' }}
        justifyContent='center'
        alignItems='center'
        height='calc(100vh - 200px)'
      >
        <Typography variant='h1' component='h1' fontSize={80} fontWeight={200}>404 |</Typography>
        <Typography marginLeft={2}>No se encontraron coincidencias</Typography>
      </Box>
    </ShopLayout>
  )
}

export default NotFoundPage;