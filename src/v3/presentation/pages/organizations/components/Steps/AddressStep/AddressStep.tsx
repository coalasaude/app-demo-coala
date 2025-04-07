import { Box } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { get } from 'lodash'

import { theme } from '@/theme'
import { cepNormalizer } from '@/components/Forms'
import { useMutateCEP } from '@/v3/presentation/hooks/api/useMutateCep'
import { onlyNumsNormalizer } from '@/components/Forms/normalizers/onlyNumsNormalizer'
import { nameNormalizer } from '@/components/Forms/normalizers/nameNormalizer'
import { CInputControlled } from '@/v3/presentation/newComponents'

import { Section } from '../../Section'

export const AddressStep = () => {
  const { mutateAsync } = useMutateCEP()
  const { setValue } = useFormContext()

  const breakpointSmall = theme.breakpoints.down('sm')
  const {
    formState: { errors },
  } = useFormContext()

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

  return (
    <Section title='Endereço'>
      <Box display='flex' gap={2} sx={{ [breakpointSmall]: { flexDirection: 'column' } }}>
        <CInputControlled
          name='address.zipCode'
          placeholder='Digite o CEP'
          onChange={(e) => handleCEPChange(e)}
          label='CEP'
          type='tel'
          size='small'
          transform={{ output: cepNormalizer }}
          fullWidth
          error={!!get(errors, 'address.zipCode')}
        />

        <CInputControlled
          placeholder='Digite o estado (UF)'
          name='address.state'
          label='Estado'
          size='small'
          transform={{ output: nameNormalizer }}
          fullWidth
          error={!!get(errors, 'address.state')}
        />
        <CInputControlled
          placeholder='Digite a cidade'
          name='address.city'
          label='Cidade'
          size='small'
          transform={{ output: nameNormalizer }}
          fullWidth
          error={!!get(errors, 'address.city')}
        />
      </Box>

      <Box display='flex' gap={2} sx={{ [breakpointSmall]: { flexDirection: 'column' } }}>
        <CInputControlled
          name='address.neighborhood'
          placeholder='Digite o bairro'
          label='Bairro'
          size='small'
          transform={{ output: nameNormalizer }}
          fullWidth
          error={!!get(errors, 'address.neighborhood')}
        />
        <CInputControlled
          placeholder='Digite a rua'
          name='address.street'
          label='Rua'
          size='small'
          transform={{ output: nameNormalizer }}
          fullWidth
          error={!!get(errors, 'address.street')}
        />
      </Box>

      <Box display='flex' gap={2} sx={{ [breakpointSmall]: { flexDirection: 'column' } }}>
        <CInputControlled
          placeholder='Digite o número'
          name='address.number'
          label='Número'
          type='tel'
          size='small'
          transform={{ output: onlyNumsNormalizer }}
          fullWidth
          error={!!get(errors, 'address.number')}
        />

        <CInputControlled
          placeholder='Digite o bloco'
          name='address.block'
          label='Bloco'
          size='small'
          fullWidth
          error={!!get(errors, 'address.block')}
        />
        <CInputControlled
          placeholder='Digite o complemento'
          name='address.complement'
          label='Complemento'
          size='small'
          fullWidth
          error={!!get(errors, 'address.complement')}
        />
      </Box>
    </Section>
  )
}
