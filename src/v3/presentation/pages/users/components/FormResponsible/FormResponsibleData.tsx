import { Box } from '@mui/material'

import { phoneNormalizer } from '@/components/Forms'
import { GridItem, GridWrapper } from '@/components/Grid'
import { nameNormalizer } from '@/components/Forms/normalizers/nameNormalizer'
import { CInputControlled } from '@/v3/presentation/newComponents'

import { IFormDependentDataProps } from './types'

export const FormResponsibleData = ({ prefix = '', ...props }: IFormDependentDataProps) => {
  return (
    <Box {...props.boxProps}>
      <GridWrapper>
        <GridItem xs={12} md={6} key='name'>
          <CInputControlled
            name={prefix + 'name'}
            label='Nome*'
            placeholder='Digite o nome'
            transform={{ output: nameNormalizer }}
            fullWidth
            disabled={props.inputProps?.disabledName}
            onChange={props.inputProps?.onChange}
          />
        </GridItem>
        <GridItem xs={12} md={6} key='lastname'>
          <CInputControlled
            name={prefix + 'lastname'}
            label='Sobrenome*'
            placeholder='Digite o sobrenome'
            transform={{ output: nameNormalizer }}
            disabled={props.inputProps?.disabledName}
            onChange={props.inputProps?.onChange}
            fullWidth
          />
        </GridItem>
        <GridItem xs={12} md={6} key='email'>
          <CInputControlled
            name={prefix + 'email'}
            label='E-mail*'
            placeholder='Digite o e-mail'
            disabled={props.inputProps?.disabledEmail}
            onChange={props.inputProps?.onChange}
          />
        </GridItem>
        <GridItem xs={12} md={6} key='phone'>
          <CInputControlled
            name={prefix + 'phone'}
            label='DDD+celular*'
            placeholder='Digite o telefone'
            transform={{ output: phoneNormalizer, input: phoneNormalizer }}
            fullWidth
            disabled={props.inputProps?.disabledPhone}
            onChange={props.inputProps?.onChange}
          />
        </GridItem>
      </GridWrapper>
    </Box>
  )
}
