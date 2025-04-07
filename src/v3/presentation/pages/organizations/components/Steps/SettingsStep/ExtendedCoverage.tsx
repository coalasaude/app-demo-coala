import { get } from 'lodash'
import { useFormContext } from 'react-hook-form'

import { CSelectChipControlled } from '@/v3/presentation/components/CSelectChipControlled'
import CSwitchControlled from '@/v3/presentation/newComponents/implementations/form/CSwitchControlled'

import { Section } from '../../Section'

interface ExtendedCoverageProps {
  productsOptions?: { label: string; value: string | number }[]
  profilesOptions?: { label: string; value: string | number }[]
}

export const ExtendedCoverageSettings = ({
  productsOptions,
  profilesOptions,
}: ExtendedCoverageProps) => {
  const {
    formState: { errors },
    watch,
  } = useFormContext()

  const isExtendedCoverage = watch('settings.extendedCoverage.enable')

  return (
    <Section title='Cobertura estendida'>
      <CSwitchControlled name='settings.extendedCoverage.enable' label='Cobertura estendida' />

      <CSelectChipControlled
        name='settings.extendedCoverage.enableProducts'
        placeholder='Produtos habilitados'
        multiple
        options={productsOptions}
        disabled={!isExtendedCoverage}
        error={get(errors, 'settings.extendedCoverage.enableProducts')}
      />

      <CSelectChipControlled
        name='settings.extendedCoverage.profiles'
        placeholder='Habilitar contratação para'
        options={profilesOptions}
        multiple
        disabled={!isExtendedCoverage}
        error={get(errors, 'settings.extendedCoverage.profiles')}
      />

      <CSwitchControlled
        disabled={!isExtendedCoverage}
        name='settings.extendedCoverage.manuallyAssignUser'
        label='Atribuir usuário manualmente'
      />
    </Section>
  )
}
