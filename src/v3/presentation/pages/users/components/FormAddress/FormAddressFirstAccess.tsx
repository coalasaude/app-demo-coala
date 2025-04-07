import { Box } from '@mui/material'

import { CSelectControlled, cepNormalizer } from '@/components/Forms'
import { GridItem, GridWrapper } from '@/components/Grid'
import { ufs } from '@/constants/uf'
import useMediaQuery from '@/hooks/useMediaQuery'
import { CInputControlled } from '@/v3/presentation/newComponents'

import { IAddressFromProps } from './types'
import { useFormCepAddress } from './hooks/useFormCepAddress'

export function FormAddressFirstAccess({ ufOptions = ufs, ...props }: IAddressFromProps) {
  const { handleCEPChange } = useFormCepAddress()
  const isSmall = useMediaQuery('md')
  const spacing = isSmall ? 2 : 3

  return (
    <Box {...props}>
      <GridWrapper spacing={spacing}>
        <GridItem xs={12} md={12}>
          <CInputControlled
            name='zipCode'
            placeholder='Digite o CEP'
            label='CEP'
            fullWidth
            onChange={(e) => handleCEPChange(e)}
            transform={{ output: cepNormalizer }}
          />
        </GridItem>
        <GridItem xs={12} md={12}>
          <CInputControlled placeholder='Digite a cidade' name='city' label='Cidade' fullWidth />
        </GridItem>
        <GridItem xs={12}>
          <GridWrapper spacing={2}>
            <GridItem xs={12} md={6}>
              <CInputControlled
                placeholder='Digite o bairro'
                name='neighborhood'
                label='Bairro'
                fullWidth
              />
            </GridItem>
            <GridItem xs={12} md={6}>
              <CSelectControlled name='state' label='Estado' fullWidth options={ufOptions} />
            </GridItem>
          </GridWrapper>
        </GridItem>
        <GridItem xs={12} md={12}>
          <CInputControlled placeholder='Digite a rua' name='street' label='Rua' fullWidth />
        </GridItem>
        <GridItem xs={12}>
          <GridWrapper spacing={2}>
            <GridItem xs={12} md={6}>
              <CInputControlled
                placeholder='Digite o número'
                name='number'
                label='Número'
                fullWidth
              />
            </GridItem>
            <GridItem xs={12} md={6}>
              <CInputControlled
                placeholder='Digite o complemento'
                name='complement'
                label='Complemento'
                fullWidth
              />
            </GridItem>
          </GridWrapper>
        </GridItem>
      </GridWrapper>
    </Box>
  )
}
