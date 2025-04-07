import { Box } from '@mui/material'

import { GridItem, GridWrapper } from '@/components/Grid'
import { nameNormalizer } from '@/components/Forms/normalizers/nameNormalizer'
import { CInputControlled } from '@/v3/presentation/newComponents'

export const FormDependentData = () => {
  return (
    <Box mb={2}>
      <GridWrapper>
        <GridItem xs={12} md={6}>
          <CInputControlled
            placeholder='Digite o nome'
            name='name'
            label='Nome*'
            transform={{ output: nameNormalizer }}
            fullWidth
          />
        </GridItem>
        <GridItem xs={12} md={6}>
          <CInputControlled
            placeholder='Digite o sobrenome'
            name='lastname'
            label='Sobrenome*'
            transform={{ output: nameNormalizer }}
            fullWidth
          />
        </GridItem>
      </GridWrapper>
    </Box>
  )
}
