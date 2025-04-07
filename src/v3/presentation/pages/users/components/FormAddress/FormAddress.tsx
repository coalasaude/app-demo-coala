import { Box } from '@mui/material'

import { CSelectControlled, cepNormalizer } from '@/components/Forms'
import { GridItem, GridWrapper } from '@/components/Grid'
import { ufs } from '@/constants/uf'
import { CInputControlled } from '@/v3/presentation/newComponents'

import { IAddressFromProps } from './types'
import { useFormCepAddress } from './hooks/useFormCepAddress'

export function FormAddress({ ufOptions = ufs, ...props }: IAddressFromProps) {
  const { handleCEPChange } = useFormCepAddress()
  return (
    <Box {...props}>
      <GridWrapper mt={3}>
        <GridItem xs={12} md={4}>
          <CInputControlled
            placeholder='Digite o CEP'
            name='zipCode'
            label='CEP'
            fullWidth
            onChange={(e) => handleCEPChange(e)}
            transform={{ output: cepNormalizer }}
          />
        </GridItem>
        <GridItem xs={12} md={4}>
          <CInputControlled name='city' label='Cidade' fullWidth placeholder='Digite a cidade' />
        </GridItem>
        <GridItem xs={12} md={4}>
          <CSelectControlled
            name='state'
            label='Estado'
            fullWidth
            options={ufOptions}
            placeholder='Digite o estado'
          />
        </GridItem>
        <GridItem xs={12} md={3}>
          <CInputControlled
            name='neighborhood'
            label='Bairro'
            fullWidth
            placeholder='Digite o bairro'
          />
        </GridItem>
        <GridItem xs={12} md={3}>
          <CInputControlled name='street' label='Rua' fullWidth placeholder='Digite a rua' />
        </GridItem>
        <GridItem xs={12} md={3}>
          <CInputControlled name='number' label='Número' fullWidth placeholder='Digite o número' />
        </GridItem>
        <GridItem xs={12} md={3}>
          <CInputControlled
            name='complement'
            label='Complemento'
            fullWidth
            placeholder='Digite o complemento'
          />
        </GridItem>
      </GridWrapper>
    </Box>
  )
}
