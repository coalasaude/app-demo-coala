import { get } from 'lodash'
import { useFormContext } from 'react-hook-form'

import { CSelectChipControlled } from '@/v3/presentation/components/CSelectChipControlled'
import CSwitchControlled from '@/v3/presentation/newComponents/implementations/form/CSwitchControlled'

import { Section } from '../../Section'

interface CoalaAtHomeProps {
  plansOptions?: { label: string; value: string | number }[]
  profilesOptions?: { label: string; value: string | number }[]
}

export const CoalaAtHomeSettings = ({ plansOptions, profilesOptions }: CoalaAtHomeProps) => {
  const {
    formState: { errors },
    watch,
  } = useFormContext()

  const isCoalaAtHomeEnabled = watch('settings.coalaAtHome.enable')

  return (
    <Section title='Coala em casa'>
      <CSwitchControlled name='settings.coalaAtHome.enable' label='Coala em casa' />

      <CSelectChipControlled
        name='settings.coalaAtHome.profiles'
        placeholder='Habilitar contratação para'
        options={profilesOptions}
        multiple
        disabled={!isCoalaAtHomeEnabled}
        error={get(errors, 'settings.coalaAtHome.profiles')}
      />

      <CSelectChipControlled
        name='settings.coalaAtHome.plan'
        placeholder='Selecione o plano'
        options={plansOptions}
        disabled={!isCoalaAtHomeEnabled}
        error={get(errors, 'settings.coalaAtHome.plan')}
      />
    </Section>
  )
}
