import { Box } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { get } from 'lodash'

import { mobilePhoneNormalizer, phoneNormalizer } from '@/components/Forms'
import { theme } from '@/theme'
import { CInputControlled } from '@/v3/presentation/newComponents'

import { Section } from '../../Section'

export const ContactsStep = () => {
  const breakpointSmall = theme.breakpoints.down('sm')
  const {
    formState: { errors },
  } = useFormContext()

  return (
    <Section title='Contatos'>
      <CInputControlled
        placeholder='Digite o e-mail da organização'
        name='contacts.email'
        label='E-mail'
        type='email'
        size='small'
        fullWidth
        required
        error={!!get(errors, 'contacts.email')}
      />

      <Box display='flex' gap={2} sx={{ [breakpointSmall]: { flexDirection: 'column' } }}>
        <CInputControlled
          placeholder='Digite o telefone da organização'
          name='contacts.telephone'
          label='Telefone'
          type='tel'
          size='small'
          transform={{ output: phoneNormalizer }}
          fullWidth
          required
          error={!!get(errors, 'contacts.telephone')}
        />

        <CInputControlled
          placeholder='Digite o WhatsApp da organização'
          name='contacts.whatsapp'
          label='WhatsApp'
          type='tel'
          size='small'
          transform={{ output: mobilePhoneNormalizer }}
          fullWidth
          error={!!get(errors, 'contacts.whatsapp')}
        />
      </Box>
    </Section>
  )
}
