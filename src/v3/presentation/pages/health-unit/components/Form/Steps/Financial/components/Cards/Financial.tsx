import _ from 'lodash'
import { useFormContext } from 'react-hook-form'
import { Box } from '@mui/material'

import { spacing } from '@/v3/presentation/utils/spacing'
import { Card } from '@/v3/presentation/pages/health-unit/components/Form/Card'
import { CSelectChipControlled } from '@/v3/presentation/components/CSelectChipControlled'
import { banks } from '@/constants/uf'
import { pixNormalizer } from '@/components/Forms/normalizers/pixNormalizer'
import { priceNormalizer } from '@/components/Forms/normalizers/priceNormalizer'
import { theme } from '@/theme'
import { HEALTH_UNIT_PAYMENT_METHOD_OPTIONS } from '@/v3/presentation/pages/health-unit/constants/paymentMethods'
import { CInputControlled } from '@/v3/presentation/newComponents'
import { CAutoComplete } from '@/components/Forms'

export const Financial = ({ noBorder }: { noBorder?: boolean }) => {
  const {
    formState: { errors },
    setValue,
    getValues,
  } = useFormContext()

  const handlePriceFocus = () => {
    if (getValues('financial.appointmentAveragePrice') === '') {
      setValue('financial.appointmentAveragePrice', 'R$ 00,00')
    }
  }

  const handlePriceBlur = () => {
    if (getValues('financial.appointmentAveragePrice') === 'R$ 00,00') {
      setValue('financial.appointmentAveragePrice', '')
    }
  }

  const breakpointSmall = theme.breakpoints.down('sm')

  return (
    <Box borderRadius={2} sx={{ background: '#fff' }}>
      <Card noBorder={noBorder} title='Dados financeiros'>
        <Box
          display='flex'
          gap={spacing(2)}
          sx={{ [breakpointSmall]: { flexDirection: 'column' } }}
        >
          <CInputControlled
            name='financial.appointmentAveragePrice'
            label='Custo médio da consulta'
            size='small'
            placeholder='Digite o custo médio da consulta'
            transform={{ output: priceNormalizer }}
            onFocus={handlePriceFocus}
            onBlur={handlePriceBlur}
            sx={{ flex: 1 }}
            error={!!_.get(errors, 'financial.appointmentAveragePrice.message')}
          />

          <CInputControlled
            name='financial.responsibleFinance'
            placeholder='Responsável pelo financeiro/NFEs'
            label='Responsável pelo financeiro/NFEs'
            size='small'
            sx={{ flex: 1 }}
            error={!!_.get(errors, 'financial.responsibleFinance.message')}
          />
        </Box>

        <CSelectChipControlled
          name='financial.paymentMethods'
          placeholder='Formas de pagamento aceitas'
          multiple
          options={HEALTH_UNIT_PAYMENT_METHOD_OPTIONS}
        />

        <CAutoComplete
          name='financial.bank.name'
          placeholder='Bancos'
          options={banks}
          label='Bancos'
        />

        <Box
          display='flex'
          gap={spacing(2)}
          sx={{ [breakpointSmall]: { flexDirection: 'column' } }}
        >
          <Box display='flex' gap={spacing(2)} flex={2}>
            <CInputControlled
              name='financial.bank.branch'
              placeholder='Agência'
              label='Agência'
              size='small'
              sx={{ flex: 1 }}
              error={!!_.get(errors, 'financial.bank.branch.message')}
            />

            <CInputControlled
              name='financial.bank.account'
              label='Conta'
              placeholder='Conta'
              size='small'
              sx={{ flex: 1 }}
              error={!!_.get(errors, 'financial.bank.account.message')}
            />
          </Box>

          <CInputControlled
            name='financial.pixKey'
            label='PIX'
            size='small'
            placeholder='Chave PIX'
            transform={{ output: pixNormalizer }}
            sx={{ flex: 1 }}
            error={!!_.get(errors, 'financial.pixKey.message')}
          />
        </Box>
      </Card>
    </Box>
  )
}
