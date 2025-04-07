import { Typography } from '@mui/material'
import { useFormContext } from 'react-hook-form'

import { GridItem } from '@/components/Grid'
import { CInput } from '@/v3/presentation/newComponents'
import { BrandSelectInputForm } from '@/v3/presentation/newComponents/implementations/form/BrandSelectInput/BrandSelectInputForm'
import { InstitutionMultSelectInputForm } from '@/v3/presentation/newComponents/implementations/form/InstitutionMultSelectInput/InstitutionMultSelectInputForm'

import { IFormNetworkProps } from './types'

export function FormNetwork({ data }: IFormNetworkProps) {
  const { watch } = useFormContext()
  const brandId = watch('brandId') as number

  return (
    <>
      <GridItem xs={12} md={6}>
        <Typography variant='h4' fontWeight='bold' mb={2}>
          Rede
        </Typography>
        <CInput
          placeholder='Selecione a rede*'
          label='Selecione a rede*'
          InputLabelProps={{ shrink: true }}
          disabled={true}
          value={data.fantasyName}
        />
      </GridItem>
      <GridItem xs={12} md={6}>
        <Typography variant='h4' fontWeight='bold' mb={2}>
          Marca
        </Typography>
        <BrandSelectInputForm
          filters={{ networkId: data.id }}
          placeholder='Selecione a marca*'
          name='brandId'
          label='Selecione a marca*'
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
          name='institutionsIds'
          brandId={brandId}
        />
      </GridItem>
    </>
  )
}
