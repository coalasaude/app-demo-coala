import { Typography } from '@mui/material'
import { useFormContext } from 'react-hook-form'

import { GridItem } from '@/components/Grid'
import { CInput } from '@/v3/presentation/newComponents'

import { IFormInstitutionProps } from './types'

export function FormInstitution({ data }: IFormInstitutionProps) {
  const { setValue, watch } = useFormContext()

  const institutionsIds = watch('institutionsIds')
  const isSelected = institutionsIds?.includes(data.id)

  if (!isSelected) setValue('institutionsIds', [data.id])

  return (
    <>
      <GridItem xs={12} md={6}>
        <Typography variant='h4' fontWeight='bold' mb={2}>
          Instituição
        </Typography>
        <CInput
          placeholder='Selecione a instituição*'
          label='Selecione a instituição*'
          InputLabelProps={{ shrink: true }}
          disabled={true}
          value={data.fantasyName}
        />
      </GridItem>
    </>
  )
}
