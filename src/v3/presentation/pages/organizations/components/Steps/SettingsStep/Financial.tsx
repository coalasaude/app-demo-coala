import { get } from 'lodash'
import { Stack, Typography } from '@mui/material'
import { useFormContext } from 'react-hook-form'

import { CSelectControlled } from '@/components/Forms'
import { priceNormalizer } from '@/components/Forms/normalizers/priceNormalizer'
import { useFetchBrand } from '@/v3/presentation/hooks/api/organizations/brand/useFetchBrand'
import { CInputControlled, CTextAreaControlled } from '@/v3/presentation/newComponents'
import CSwitchControlled from '@/v3/presentation/newComponents/implementations/form/CSwitchControlled'
import { useAuth } from '@/v3/presentation/hooks/useAuth'

import { Section } from '../../Section'
import { PROFILES_DESCRIPTION, Profiles } from '../../../constants/profiles'
import { OrganizationType } from '../../../constants/organizationType'

type FinancialSettingsProps = {
  profilesOptions?: { label: string; value: string | number }[]
}

export const FinancialSettings = ({ profilesOptions }: FinancialSettingsProps) => {
  const { auth } = useAuth()
  const isAdmin = auth?.user?.isAdmin
  const {
    formState: { errors },
    watch,
  } = useFormContext()

  const links = watch('links')
  const brand = useFetchBrand(links?.institution?.brand)

  const profiles = watch([
    'settings.standardCoverage.emergencyCallcenter',
    'settings.standardCoverage.accidentCoverage',
    'settings.standardCoverage.mentalHealthModule',
    'settings.coalaAtHome.profiles',
  ]).flat(Infinity)

  const costCenterOptions = [
    brand.data?.networkId && { label: 'Rede', value: OrganizationType.NETWORK },
    links?.institution?.brand && { label: 'Marca', value: OrganizationType.BRAND },
    { label: 'Instituição', value: OrganizationType.INSTITUTION },
  ].filter(Boolean)

  const hasProfile = (type: string) => {
    return profiles?.some((p) =>
      profilesOptions?.some((o) => o.label.toLowerCase() === type.toLowerCase() && p == o.value),
    )
  }

  return (
    <Section title='Financeiro'>
      <Typography variant='h3' sx={{ fontSize: 18 }}>
        Valor negociado por usuário coberto
      </Typography>

      <CInputControlled
        name='settings.financial.valuePerUserCovered.manager'
        label='Gestor'
        transform={{ output: priceNormalizer }}
        disabled={!hasProfile(PROFILES_DESCRIPTION[Profiles.MANAGER])}
        error={!!get(errors, 'settings.financial.valuePerUserCovered.manager')}
        placeholder='Valor negociado por gestor coberto'
      />

      <CInputControlled
        name='settings.financial.valuePerUserCovered.employee'
        label='Colaborador'
        transform={{ output: priceNormalizer }}
        disabled={!hasProfile(PROFILES_DESCRIPTION[Profiles.EMPLOYEE])}
        error={!!get(errors, 'settings.financial.valuePerUserCovered.employee')}
        placeholder='Valor negociado por colaborador coberto'
      />

      <CInputControlled
        name='settings.financial.valuePerUserCovered.student'
        label='Aluno'
        transform={{ output: priceNormalizer }}
        disabled={!hasProfile(PROFILES_DESCRIPTION[Profiles.STUDENT])}
        error={!!get(errors, 'settings.financial.valuePerUserCovered.student')}
        placeholder='Valor negociado por aluno coberto'
      />

      <Typography variant='h3' sx={{ fontSize: 18 }}>
        Qual é o centro de custo?
      </Typography>

      <CSelectControlled
        name='settings.financial.costCenter'
        label='Selecione o centro de custo'
        options={costCenterOptions}
        error={get(errors, 'settings.financial.costCenter')}
      />

      <Stack gap={1}>
        <Typography variant='h3' sx={{ fontSize: 18 }}>
          E-mails para envio de cobranças
        </Typography>
        <Typography variant='body2'>
          Os e-mails adicionados devem ser separados usando “;” (ponto e vírgula)
        </Typography>
      </Stack>

      <CTextAreaControlled
        name='settings.financial.emails'
        fullWidth
        label='E-mails para envio de cobranças'
        placeholder='E-mails para envio de cobranças'
        error={!!get(errors, 'settings.financial.emails')}
      />

      <CSwitchControlled
        name='settings.financial.latePayment'
        label='Instituição está com pagamento atrasado?'
        disabled={!isAdmin}
      />

      <CSwitchControlled
        name='settings.financial.infringement'
        label='Instituição está inadimplente?'
        disabled={!isAdmin}
      />
    </Section>
  )
}
