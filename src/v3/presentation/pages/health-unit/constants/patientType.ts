import { HealUnitPatientType } from '@/types/healthUnit'

export const HEALTH_UNIT_PATIENT_TYPE_DESCRIPTIONS = {
  [HealUnitPatientType.ADULT]: 'Adulto',
  [HealUnitPatientType.PEDIATRIC]: 'Pediátrico',
}

export const HEALTH_UNIT_PATIENT_TYPE_OPTIONS = [
  {
    label: HEALTH_UNIT_PATIENT_TYPE_DESCRIPTIONS[HealUnitPatientType.ADULT],
    value: HealUnitPatientType.ADULT,
  },
  {
    label: HEALTH_UNIT_PATIENT_TYPE_DESCRIPTIONS[HealUnitPatientType.PEDIATRIC],
    value: HealUnitPatientType.PEDIATRIC,
  },
]
