import { HealthUnitImagingExams } from '@/types/healthUnit'

export const HEALTH_UNIT_IMAGING_EXAMS_DESCRIPTIONS = {
  [HealthUnitImagingExams.RESONANCE]: 'Ressonancia',
  [HealthUnitImagingExams.TOMOGRAPHY]: 'Tomografia',
  [HealthUnitImagingExams.ULTRASONOGRAPHY]: 'USG',
  [HealthUnitImagingExams.XRAY]: 'Raio-X',
}

export const HEALTH_UNIT_IMAGING_EXAMS_OPTIONS = [
  {
    label: HEALTH_UNIT_IMAGING_EXAMS_DESCRIPTIONS[HealthUnitImagingExams.RESONANCE],
    value: HealthUnitImagingExams.RESONANCE,
  },
  {
    label: HEALTH_UNIT_IMAGING_EXAMS_DESCRIPTIONS[HealthUnitImagingExams.TOMOGRAPHY],
    value: HealthUnitImagingExams.TOMOGRAPHY,
  },
  {
    label: HEALTH_UNIT_IMAGING_EXAMS_DESCRIPTIONS[HealthUnitImagingExams.ULTRASONOGRAPHY],
    value: HealthUnitImagingExams.ULTRASONOGRAPHY,
  },
  {
    label: HEALTH_UNIT_IMAGING_EXAMS_DESCRIPTIONS[HealthUnitImagingExams.XRAY],
    value: HealthUnitImagingExams.XRAY,
  },
]
