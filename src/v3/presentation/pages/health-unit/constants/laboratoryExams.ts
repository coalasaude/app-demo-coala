import { HealthUnitLaboratoryExams } from '@/types/healthUnit'

export const HEALTH_UNIT_LABORATORY_EXAMS_DESCRIPTIONS = {
  [HealthUnitLaboratoryExams.BLOOD]: 'Sangue',
  [HealthUnitLaboratoryExams.HEMOCULTURE]: 'Hemocultura',
  [HealthUnitLaboratoryExams.URINE]: 'EAS',
  [HealthUnitLaboratoryExams.UROCULTURE]: 'Urocultura',
}

export const HEALTH_UNIT_LABORATORY_EXAMS_OPTIONS = [
  {
    label: HEALTH_UNIT_LABORATORY_EXAMS_DESCRIPTIONS[HealthUnitLaboratoryExams.BLOOD],
    value: HealthUnitLaboratoryExams.BLOOD,
  },
  {
    label: HEALTH_UNIT_LABORATORY_EXAMS_DESCRIPTIONS[HealthUnitLaboratoryExams.HEMOCULTURE],
    value: HealthUnitLaboratoryExams.HEMOCULTURE,
  },
  {
    label: HEALTH_UNIT_LABORATORY_EXAMS_DESCRIPTIONS[HealthUnitLaboratoryExams.URINE],
    value: HealthUnitLaboratoryExams.URINE,
  },
  {
    label: HEALTH_UNIT_LABORATORY_EXAMS_DESCRIPTIONS[HealthUnitLaboratoryExams.UROCULTURE],
    value: HealthUnitLaboratoryExams.UROCULTURE,
  },
]
