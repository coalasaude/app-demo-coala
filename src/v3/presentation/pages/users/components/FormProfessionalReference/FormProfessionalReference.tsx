import { Box } from '@mui/material'

import { CSelectControlled, phoneNormalizer } from '@/components/Forms'
import { nameNormalizer } from '@/components/Forms/normalizers/nameNormalizer'
import { GridItem, GridWrapper } from '@/components/Grid'
import { ProfessionalTypeOptions } from '@/types/professionalReference'
import { CInputControlled } from '@/v3/presentation/newComponents'

import { IFormProfessionalProps } from './types'

export function FormProfessionalReference({
  professionalTypeOptions = ProfessionalTypeOptions,
  prefix = '',
  ...props
}: IFormProfessionalProps) {
  return (
    <Box {...props}>
      <GridWrapper mt={1}>
        <GridItem xs={12} md={6}>
          <CInputControlled
            name={prefix + 'name'}
            label='Nome*'
            placeholder='Nome do profissional*'
            transform={{ output: nameNormalizer }}
            fullWidth
          />
        </GridItem>
        <GridItem xs={12} md={6}>
          <CInputControlled
            name={prefix + 'email'}
            label='E-mail'
            fullWidth
            placeholder='Digite o email'
          />
        </GridItem>
        <GridItem xs={12} md={6}>
          <CInputControlled
            placeholder='Digite o telefone*'
            name={prefix + 'phone'}
            label='Telefone*'
            fullWidth
            transform={{ output: phoneNormalizer }}
          />
        </GridItem>
        <GridItem xs={12} md={6}>
          <CSelectControlled
            name={prefix + 'professionalType'}
            label='Tipo*'
            fullWidth
            options={professionalTypeOptions}
          />
        </GridItem>
      </GridWrapper>
    </Box>
  )
}
