import { useRouter } from 'next/router'

import { CSelectChipControlled } from '@/v3/presentation/components/CSelectChipControlled'
import CSwitchControlled from '@/v3/presentation/newComponents/implementations/form/CSwitchControlled'
import { Card } from '@/v3/presentation/pages/health-unit/components/Form/Card'
import {
  HEALTH_UNIT_CARE_UNITS_OPTIONS,
  HEALTH_UNIT_IMAGING_EXAMS_OPTIONS,
  HEALTH_UNIT_IMMOBILIZATION_TYPES_OPTIONS,
  HEALTH_UNIT_LABORATORY_EXAMS_OPTIONS,
} from '@/v3/presentation/pages/health-unit/constants'

export const Appointment = () => {
  const { pathname } = useRouter()

  const noBorder = !pathname.includes('edit')

  return (
    <Card noBorder={noBorder} title='Informações de atendimento'>
      <CSwitchControlled name='appointment.doSutures' label='A unidade realiza sutura' />
      <CSwitchControlled name='appointment.doMedication' label='A unidade realiza medicação' />
      <CSwitchControlled name='appointment.doSurgery' label='A unidade realiza cirurgia' />

      <CSelectChipControlled
        name='appointment.imagingExams'
        placeholder='Exames de imagem disponíveis'
        multiple
        options={HEALTH_UNIT_IMAGING_EXAMS_OPTIONS}
      />

      <CSelectChipControlled
        name='appointment.laboratoryExams'
        placeholder='Exames laboratoriais disponíveis'
        multiple
        options={HEALTH_UNIT_LABORATORY_EXAMS_OPTIONS}
      />

      <CSelectChipControlled
        name='appointment.careUnits'
        placeholder='Unidades de internação'
        multiple
        options={HEALTH_UNIT_CARE_UNITS_OPTIONS}
      />

      <CSelectChipControlled
        name='appointment.immobilizationTypes'
        placeholder='Tipos de imobilização'
        multiple
        options={HEALTH_UNIT_IMMOBILIZATION_TYPES_OPTIONS}
      />
    </Card>
  )
}
