import { useFormContext } from 'react-hook-form'
import { get } from 'lodash'
import { Box } from '@mui/material'

import { Card } from '@/v3/presentation/pages/health-unit/components/Form/Card'
import { cepNormalizer } from '@/components/Forms'
import { useMutateCEP } from '@/v3/presentation/hooks/api/useMutateCep'
import { onlyNumsNormalizer } from '@/components/Forms/normalizers/onlyNumsNormalizer'
import { theme } from '@/theme'
import { nameNormalizer } from '@/components/Forms/normalizers/nameNormalizer'
import { CInputControlled } from '@/v3/presentation/newComponents'

export const Address = ({ noBorder }: { noBorder?: boolean }) => {
  const {
    formState: { errors },
    setValue,
  } = useFormContext()

  const { mutateAsync } = useMutateCEP()

  const handleCEPChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event?.target?.value

    if (value?.length === 9) {
      mutateAsync({ cep: value }).then((response) => {
        if (!('isError' in response)) {
          setValue('address.state', response.uf)
          setValue('address.city', response.localidade)
          setValue('address.neighborhood', response.bairro)
          setValue('address.street', response.logradouro)
        }
      })
    }
  }

  const breakpointSmall = theme.breakpoints.down('sm')

  return (
    <Card noBorder={noBorder} title='Endereço'>
      <Box display='flex' flexDirection='column' gap={2}>
        <Box display='flex' gap={2} sx={{ [breakpointSmall]: { flexDirection: 'column' } }}>
          <CInputControlled
            name='address.zipCode'
            onChange={(e) => handleCEPChange(e)}
            label='CEP'
            placeholder='Digite o CEP'
            size='small'
            transform={{ output: cepNormalizer }}
            fullWidth
            error={!!get(errors, 'company.address.zipCode.message')}
          />

          <CInputControlled
            name='address.state'
            label='Estado'
            placeholder='Digite o estado'
            size='small'
            fullWidth
            transform={{ output: nameNormalizer }}
            error={!!get(errors, 'company.address.state.message')}
          />

          <CInputControlled
            name='address.city'
            label='Cidade'
            placeholder='Digite a cidade'
            size='small'
            fullWidth
            transform={{ output: nameNormalizer }}
            error={!!get(errors, 'company.address.city.message')}
          />
        </Box>

        <Box display='flex' gap={2} sx={{ [breakpointSmall]: { flexDirection: 'column' } }}>
          <CInputControlled
            name='address.neighborhood'
            label='Bairro'
            placeholder='Digite o bairro'
            size='small'
            fullWidth
            transform={{ output: nameNormalizer }}
            error={!!get(errors, 'company.address.neighborhood.message')}
          />

          <CInputControlled
            name='address.street'
            label='Rua'
            placeholder='Digite a rua'
            size='small'
            fullWidth
            transform={{ output: nameNormalizer }}
            error={!!get(errors, 'company.address.street.message')}
          />
        </Box>

        <Box display='flex' gap={2} sx={{ [breakpointSmall]: { flexDirection: 'column' } }}>
          <CInputControlled
            name='address.number'
            placeholder='Digite o número'
            label='Número'
            size='small'
            transform={{ output: onlyNumsNormalizer }}
            fullWidth
            error={!!get(errors, 'company.address.number.message')}
          />

          <CInputControlled
            name='address.block'
            label='Bloco'
            placeholder='Digite o bloco'
            size='small'
            fullWidth
            error={!!get(errors, 'company.address.complementBlock.message')}
          />

          <CInputControlled
            name='address.complement'
            label='Complemento'
            placeholder='Digite o complemento'
            size='small'
            fullWidth
            error={!!get(errors, 'company.address.complement.message')}
          />
        </Box>
      </Box>
    </Card>
  )
}
