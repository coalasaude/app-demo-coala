import { Box } from '@mui/material'
import dayjs from 'dayjs'

import { CDatePickerControlled } from '@/components/Forms'
import { GridItem, GridWrapper } from '@/components/Grid'
import { CInputControlled } from '@/v3/presentation/newComponents'
import { CFileInputControlled } from '@/v3/presentation/newComponents/implementations/form/CFileInputControlled'
import { MAX_ACCEPTED_DATE, UNTIL_TODAY } from '@/v3/utils/accept-date'

import { IHealthInsuranceFormProps } from './types'

export const FormHealthInsurance = ({ prefix = '', ...props }: IHealthInsuranceFormProps) => {
  return (
    <Box {...props}>
      <GridWrapper mt={1}>
        <GridItem xs={12} md={6}>
          <CInputControlled
            name={prefix + 'insuranceCompany'}
            label='Operadora/Plano de saúde*'
            placeholder='Nome da operadora ou plano de saúde*'
            fullWidth
          />
        </GridItem>
        <GridItem xs={12} md={6}>
          <CDatePickerControlled
            name={prefix + 'validUntil'}
            label='Validade*'
            minDate={dayjs(UNTIL_TODAY)}
            maxDate={dayjs(MAX_ACCEPTED_DATE)}
          />
        </GridItem>
        <GridItem xs={12} md={6}>
          <CInputControlled
            name={prefix + 'code'}
            label='Código*'
            placeholder='Insira o código*'
            fullWidth
          />
        </GridItem>
        <GridItem xs={12} md={6}>
          <CInputControlled
            name={prefix + 'plan'}
            label='Plano*'
            placeholder='Insira o plano*'
            fullWidth
          />
        </GridItem>
        <GridItem xs={12} md={6}>
          <CFileInputControlled
            name={prefix + 'document'}
            label='Carteirinha*'
            placeholder='Insira aqui a carteirinha*'
            accept='.pdf, image/*'
          />
        </GridItem>
      </GridWrapper>
    </Box>
  )
}
