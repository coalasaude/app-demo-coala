import { Box } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { get } from 'lodash'

import { pixNormalizer } from '@/components/Forms/normalizers/pixNormalizer'
import { spacing } from '@/v3/presentation/utils/spacing'
import { CSelectControlled } from '@/components/Forms'
import { theme } from '@/theme'
import { banks } from '@/constants/banks'
import { CInputControlled } from '@/v3/presentation/newComponents'

import { Section } from '../../Section'
import { DUE_DATE_OPTIONS } from '../../../constants/dueDate'

export const FinancialStep = () => {
  const breakpointSmall = theme.breakpoints.down('sm')
  const {
    formState: { errors },
  } = useFormContext()

  return (
    <Section title='Financeiro'>
      <Box display='flex' gap={spacing(2)} sx={{ [breakpointSmall]: { flexDirection: 'column' } }}>
        <CInputControlled
          name='financial.responsableFinance'
          label='Responsável pelo financeiro/NFEs'
          size='small'
          placeholder='Digite o nome do responsável pelo financeiro/NFEs'
          sx={{ flex: 1 }}
          error={!!get(errors, 'financial.responsableFinance')}
        />
      </Box>

      <Box display='flex' gap={spacing(2)} sx={{ [breakpointSmall]: { flexDirection: 'column' } }}>
        <CSelectControlled
          name='financial.dueDate'
          label='Data de vencimento'
          options={DUE_DATE_OPTIONS}
          error={get(errors, 'financial.dueDate')}
        />

        <CSelectControlled
          name='financial.bank.bank'
          label='Banco'
          options={banks}
          error={get(errors, 'financial.bank')}
        />
      </Box>

      <Box display='flex' gap={spacing(2)} sx={{ [breakpointSmall]: { flexDirection: 'column' } }}>
        <Box display='flex' gap={spacing(2)} flex={2}>
          <CInputControlled
            placeholder='Digite a agência do banco'
            name='financial.bank.agency'
            label='Agência'
            size='small'
            sx={{ flex: 1 }}
            error={!!get(errors, 'financial.branch')}
          />

          <CInputControlled
            placeholder='Digite a conta do banco'
            name='financial.bank.account'
            label='Conta'
            size='small'
            sx={{ flex: 1 }}
            error={!!get(errors, 'financial.account')}
          />
        </Box>

        <CInputControlled
          placeholder='Digite a chave PIX'
          name='financial.bank.pixKey'
          label='PIX'
          size='small'
          transform={{ input: pixNormalizer }}
          sx={{ flex: 1 }}
          error={!!get(errors, 'financial.pixkey')}
        />
      </Box>
    </Section>
  )
}
