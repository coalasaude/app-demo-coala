import { useFormContext } from 'react-hook-form'
import { get } from 'lodash'
import { Box } from '@mui/material'

import { phoneNormalizer } from '@/components/Forms'
import { Card } from '@/v3/presentation/pages/health-unit/components/Form/Card'
import { theme } from '@/theme'
import { CInputControlled } from '@/v3/presentation/newComponents'

export const Contacts = ({ noBorder }: { noBorder?: boolean }) => {
  const {
    formState: { errors },
  } = useFormContext()

  const breakpointSmall = theme.breakpoints.down('sm')

  return (
    <Card noBorder={noBorder} title='Contatos'>
      <Box display='flex' flexDirection='column' gap={2}>
        <CInputControlled
          name='contact.email'
          label='E-mail'
          placeholder='Digite o e-mail da unidade de saúde'
          type='email'
          size='small'
          fullWidth
          error={!!get(errors, 'company.email.message')}
        />

        <Box display='flex' gap={2} sx={{ [breakpointSmall]: { flexDirection: 'column' } }}>
          <CInputControlled
            name='contact.phone'
            placeholder='Digite o telefone da unidade de saúde'
            label='Telefone'
            type='tel'
            size='small'
            transform={{ output: phoneNormalizer }}
            fullWidth
            required
            error={!!get(errors, 'company.telephone.message')}
          />

          <CInputControlled
            name='contact.whatsapp'
            placeholder='Digite o WhatsApp da unidade de saúde'
            label='WhatsApp'
            type='tel'
            size='small'
            transform={{ output: phoneNormalizer }}
            fullWidth
            error={!!get(errors, 'company.whatsapp.message')}
          />
        </Box>
      </Box>
    </Card>
  )
}
