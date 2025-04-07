import { Box } from '@mui/material'
import dayjs from 'dayjs'

import { CSelectControlled, CDatePickerControlled } from '@/components/Forms'
import { GridItem, GridWrapper } from '@/components/Grid'

import { IGeneralDataFromProps } from './types'

function renderValue<T = any>(value: any, options: { value: T; label: string }[]) {
  const selectedOptions = options.filter((option) => value.includes(option.value))
  return selectedOptions.map((option) => option.label).join(', ') || 'Selecione'
}

export function FormGeneralData<T = any, R = any>({
  prefixName = '',
  bloodTypeOptions,
  genderOptions,
}: IGeneralDataFromProps<T, R>) {
  return (
    <Box>
      <GridWrapper>
        <GridItem xs={6} md={6}>
          <CDatePickerControlled
            name={`${prefixName}birthDate`}
            label='Data de nascimento*'
            rules={{ required: true }}
            maxDate={dayjs()}
          />
        </GridItem>
        <GridItem xs={6} md={6}>
          <CSelectControlled
            name={`${prefixName}bloodType`}
            label='Tipo sanguíneo'
            fullWidth
            renderValue={(value: any) => renderValue(value, bloodTypeOptions)}
            options={bloodTypeOptions}
          />
        </GridItem>
        <GridItem xs={12} md={6}>
          <CSelectControlled
            name={`${prefixName}genre`}
            label='Gênero*'
            fullWidth
            renderValue={(value: any) => renderValue(value, genderOptions)}
            options={genderOptions}
          />
        </GridItem>
      </GridWrapper>
    </Box>
  )
}
