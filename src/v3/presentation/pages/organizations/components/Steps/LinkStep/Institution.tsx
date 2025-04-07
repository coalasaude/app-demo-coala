import { useMemo } from 'react'
import { Box, Typography } from '@mui/material'
import { useFormContext } from 'react-hook-form'

import { CSelectControlled } from '@/components/Forms'
import { useFetchListBrands, useFetchNetwork } from '@/v3/presentation/hooks/api/organizations'

import { Section } from '../../Section'

export const Institution = () => {
  const form = useFormContext()
  const brandId = form.watch('links.institution.brand')

  const { data: brandData } = useFetchListBrands({ limit: 50, offset: 0 })

  const networkId = useMemo(
    () => brandData?.results?.find((brand) => brand.id == brandId)?.networkId,
    [brandData?.results, brandId],
  )

  const { data: networkData } = useFetchNetwork(networkId)

  const brandOptions = brandData?.results?.map((brand) => ({
    label: brand.fantasyName,
    value: brand.id,
  }))
  const defaultOption = { label: '', value: 0 }

  return (
    <Section title='Marca vinculada'>
      <CSelectControlled
        name='links.institution.brand'
        label='Selecione a Marca'
        options={[defaultOption, ...(brandOptions || [])]}
      />

      <Box mt={1}>
        <Typography variant='h5'>Rede vinculada</Typography>

        <Box mt={1}>
          <Typography variant='caption' sx={{ color: 'var(--mui-palette-grey-600)' }}>
            Rede
          </Typography>

          <Typography variant='h5'>
            {networkData?.fantasyName || 'Nenhuma vinculada a marca'}
          </Typography>
        </Box>
      </Box>
    </Section>
  )
}
