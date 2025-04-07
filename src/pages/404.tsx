import { Box, Button, Typography } from '@mui/material'
import Router from 'next/router'

import NotFoundSvg from '/public/assets/svg/404.svg'

export const NotFoundPage = () => {
  return (
    <Box
      width='100%'
      height='100%'
      minHeight='100vh'
      display='flex'
      alignItems='center'
      justifyContent='center'
      bgcolor='var(--mui-palette-grey-100)'
      flexDirection='column'
    >
      <NotFoundSvg />
      <Typography variant='h1' color='var(--mui-palette-grey-400)' mt={4}>
        Oops, esta página não existe!
      </Typography>
      <Box mt={4}>
        <Button variant='contained' onClick={() => Router.push('/')}>
          Ir para página inicial
        </Button>
      </Box>
    </Box>
  )
}

export default NotFoundPage
