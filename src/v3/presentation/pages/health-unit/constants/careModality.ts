import { HealthUnitCareModality } from '@/types/healthUnit'

export const HEALTH_UNIT_CARE_MODALITY_DESCRIPTIONS = {
  [HealthUnitCareModality.ADMISSION]: 'Encaixe',
  [HealthUnitCareModality.APPOINTMENT]: 'Agendamento',
  [HealthUnitCareModality.EMERGENCY]: 'Prontoatendimento',
}

export const HEALTH_UNIT_CARE_MODALITY_OPTIONS = [
  {
    label: HEALTH_UNIT_CARE_MODALITY_DESCRIPTIONS[HealthUnitCareModality.ADMISSION],
    value: HealthUnitCareModality.ADMISSION,
  },
  {
    label: HEALTH_UNIT_CARE_MODALITY_DESCRIPTIONS[HealthUnitCareModality.APPOINTMENT],
    value: HealthUnitCareModality.APPOINTMENT,
  },
  {
    label: HEALTH_UNIT_CARE_MODALITY_DESCRIPTIONS[HealthUnitCareModality.EMERGENCY],
    value: HealthUnitCareModality.EMERGENCY,
  },
]
