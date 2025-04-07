import { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { get } from 'lodash'
import dayjs from 'dayjs'

import { spacing } from '@/v3/presentation/utils/spacing'
import { Card } from '@/v3/presentation/pages/health-unit/components/Form/Card'
import { CSelectChipControlled } from '@/v3/presentation/components/CSelectChipControlled'
import {
  HEALTH_UNIT_CARE_MODALITY_OPTIONS,
  HEALTH_UNIT_PATIENT_TYPE_OPTIONS,
} from '@/v3/presentation/pages/health-unit/constants'
import CTimePickerControlled from '@/v3/presentation/newComponents/implementations/form/CTimePickerControlled'
import { CTextAreaControlled } from '@/v3/presentation/newComponents'
import CSwitch from '@/v3/presentation/newComponents/atoms/CSwitch'

export const Infrastructure = ({ noBorder }: { noBorder?: boolean }) => {
  const [is24h, setIs24h] = useState(false)

  const {
    formState: { errors },
    setValue,
    getValues,
  } = useFormContext()

  useEffect(() => {
    const openAt = getValues('infrastructure.openAt')
    const closeAt = getValues('infrastructure.closeAt')

    if (openAt === '' && openAt === closeAt) {
      setIs24h(true)
    }
  }, [getValues])

  const handleSwitchChange = () => {
    if (!is24h) {
      setValue('infrastructure.openAt', dayjs().hour(0).minute(0).second(0).millisecond(0))
      setValue('infrastructure.closeAt', dayjs().hour(23).minute(59).second(0).millisecond(0))
    } else {
      setValue('infrastructure.openAt', '')
      setValue('infrastructure.closeAt', '')
    }

    setIs24h(!is24h)
  }

  return (
    <Card noBorder={noBorder} title='Dados de infraestrutura'>
      <Box display='flex' alignItems='center' justifyContent='flex-start' gap={1}>
        <CSwitch value={is24h} onChange={handleSwitchChange} />
        Aberto 24h
      </Box>

      <Box display='flex' gap={spacing(2)}>
        <CTimePickerControlled
          name='infrastructure.openAt'
          label='Abre'
          sx={{ flex: 1 }}
          disabled={is24h}
        />

        <CTimePickerControlled
          name='infrastructure.closeAt'
          label='Fecha'
          sx={{ flex: 1 }}
          disabled={is24h}
        />
      </Box>

      <CSelectChipControlled
        name='infrastructure.patientType'
        placeholder='Perfil do paciente'
        multiple
        options={HEALTH_UNIT_PATIENT_TYPE_OPTIONS}
      />

      <CSelectChipControlled
        name='infrastructure.careModality'
        placeholder='Modalidade de atendimento'
        multiple
        options={HEALTH_UNIT_CARE_MODALITY_OPTIONS}
      />

      <CTextAreaControlled
        name='infrastructure.notes'
        fullWidth
        label='Notas'
        placeholder='Digite as notas'
        error={!!get(errors, 'infrastructure.notes')}
      />
    </Card>
  )
}
