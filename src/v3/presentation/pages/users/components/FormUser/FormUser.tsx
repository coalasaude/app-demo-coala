import { Box } from '@mui/material'

import { phoneNormalizer } from '@/components/Forms'
import { GridItem, GridWrapper } from '@/components/Grid'
import { nameNormalizer } from '@/components/Forms/normalizers/nameNormalizer'
import { CInputControlled } from '@/v3/presentation/newComponents'

export type FormUserDataProps = {
  withRegister?: boolean
}

export const FormUser = ({ withRegister }: FormUserDataProps) => {
  return (
    <Box mb={2}>
      <GridWrapper>
        <GridItem xs={12} md={6}>
          <CInputControlled
            name='name'
            placeholder='Digite o nome'
            label='Nome*'
            transform={{ output: nameNormalizer }}
            fullWidth
          />
        </GridItem>
        <GridItem xs={12} md={6}>
          <CInputControlled
            name='lastname'
            placeholder='Digite o sobrenome'
            label='Sobrenome*'
            transform={{ output: nameNormalizer }}
            fullWidth
          />
        </GridItem>
        <GridItem xs={12} md={6}>
          <CInputControlled name='email' label='E-mail*' placeholder='Digite o e-mail' fullWidth />
        </GridItem>
        <GridItem xs={12} md={6}>
          <CInputControlled
            name='phone'
            placeholder='Digite o telefone'
            label='Telefone*'
            transform={{ output: phoneNormalizer }}
            fullWidth
          />
        </GridItem>

        {withRegister && (
          <GridItem xs={12} md={6}>
            <CInputControlled
              name='registerCode'
              placeholder='Digite o número de registro'
              label='Número de registro*'
              fullWidth
            />
          </GridItem>
        )}
      </GridWrapper>
    </Box>
  )
}
