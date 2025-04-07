import { Typography } from '@mui/material'
import { useFormContext } from 'react-hook-form'

import { GridItem } from '@/components/Grid'
import { CInput } from '@/v3/presentation/newComponents'
import { InstitutionMultSelectInputForm } from '@/v3/presentation/newComponents/implementations/form/InstitutionMultSelectInput/InstitutionMultSelectInputForm'

import { IFormBrandProps } from './types'

export function FormBrand({ data }: IFormBrandProps) {
  const { watch } = useFormContext()

  const brandId = watch('brandId') as number

  return (
    <>
      <GridItem xs={12} md={6}>
        <Typography variant='h4' fontWeight='bold' mb={2}>
          Marca
        </Typography>
        <CInput
          placeholder='Selecione a marca*'
          label='Selecione a marca*'
          InputLabelProps={{ shrink: true }}
          disabled={true}
          value={data.fantasyName}
        />
      </GridItem>
      <GridItem xs={12} md={6}>
        <Typography variant='h4' fontWeight='bold' mb={2}>
          Instituição
        </Typography>
        <InstitutionMultSelectInputForm
          placeholder='Selecione a instituição*'
          label='Selecione a instituição*'
          disabled={!brandId}
          brandId={brandId}
          name='institutionsIds'
        />
      </GridItem>
    </>
  )
}
