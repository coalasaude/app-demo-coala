import { get } from 'lodash'
import { Box } from '@mui/material'
import { useFormContext } from 'react-hook-form'

import { CSelectChipControlled } from '@/v3/presentation/components/CSelectChipControlled'
import CTimePickerControlled from '@/v3/presentation/newComponents/implementations/form/CTimePickerControlled'
import { onlyNumsNormalizer } from '@/components/Forms/normalizers/onlyNumsNormalizer'
import { priceNormalizer } from '@/components/Forms/normalizers/priceNormalizer'
import { CInputControlled } from '@/v3/presentation/newComponents'
import CSwitchControlled from '@/v3/presentation/newComponents/implementations/form/CSwitchControlled'

import { Section } from '../../Section'

interface StandardCoverageSettingsProps {
  profilesOptions?: { label: string; value: string | number }[]
}

export const StandardCoverageSettings = ({ profilesOptions }: StandardCoverageSettingsProps) => {
  const {
    formState: { errors },
    watch,
  } = useFormContext()

  const isOpeningHoursEnabled = watch('settings.standardCoverage.openingHours')

  return (
    <Section title='Cobertura padrão'>
      <CSwitchControlled
        name='settings.standardCoverage.openingHours'
        label='Horário de atendimento por instituição'
      />

      <Box sx={{ display: 'flex', gap: 2 }}>
        <CTimePickerControlled
          name='settings.standardCoverage.startTime'
          label='Horário de início'
          disabled={!isOpeningHoursEnabled}
          error={get(errors, 'settings.standardCoverage.startTime')}
          data-testid='StartTimeInput'
        />

        <CTimePickerControlled
          name='settings.standardCoverage.endTime'
          label='Horário final'
          disabled={!isOpeningHoursEnabled}
          error={get(errors, 'settings.standardCoverage.endTime')}
          data-testid='EndTimeInput'
        />
      </Box>

      <CSelectChipControlled
        name='settings.standardCoverage.emergencyCallcenter'
        placeholder='Telemedicina de urgência'
        options={profilesOptions}
        multiple
        error={get(errors, 'settings.standardCoverage.emergencyCallcenter')}
      />

      <CInputControlled
        name='settings.standardCoverage.amenities'
        label='Quantidade de cortesias'
        transform={{ output: onlyNumsNormalizer }}
        error={!!get(errors, 'settings.standardCoverage.amenities')}
        placeholder='Digite a quantidade de cortesias'
      />

      <CSelectChipControlled
        name='settings.standardCoverage.accidentCoverage'
        placeholder='Cobertura de acidentes'
        options={profilesOptions}
        multiple
        error={get(errors, 'settings.standardCoverage.accidentCoverage')}
      />

      <CInputControlled
        name='settings.standardCoverage.accidentCoverageValue'
        label='Valor da cobertura de acidentes'
        transform={{ output: priceNormalizer }}
        error={!!get(errors, 'settings.standardCoverage.accidentCoverageValue')}
        placeholder='Digite o valor da cobertura de acidentes'
      />

      <CSelectChipControlled
        name='settings.standardCoverage.mentalHealthModule'
        placeholder='Módulo de saúde mental'
        options={profilesOptions}
        multiple
        error={get(errors, 'settings.standardCoverage.mentalHealthModule')}
      />

      <CSelectChipControlled
        name='settings.standardCoverage.nutritionCoverage'
        placeholder='Nutrição'
        options={profilesOptions}
        multiple
        error={get(errors, 'settings.standardCoverage.nutritionCoverage')}
      />
    </Section>
  )
}
