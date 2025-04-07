import { Box, Typography } from '@mui/material'

import { CDivider } from '@/v3/presentation/newComponents'
import { CardTitle } from '@/v3/presentation/components/Cards/CardTitle'

import { FormDependentData } from '../../../../FormDependentData'

export const FormNewDependent = () => {
  return (
    <Box>
      <CardTitle>Novo dependente</CardTitle>
      <CDivider sx={{ my: 2 }} />
      <Typography variant='h6' sx={{ wordBreak: 'break-word' }}>
        Não encontrou o dependente que procura acima? Você pode cadastrar um novo preenchendo os
        campos abaixo.
      </Typography>

      <Typography variant='h4' mb={2} mt={3}>
        Dependente
      </Typography>

      <FormDependentData />
    </Box>
  )
}
