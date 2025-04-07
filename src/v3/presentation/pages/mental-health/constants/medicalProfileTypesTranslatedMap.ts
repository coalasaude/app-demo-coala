import { medicalProfileTypes } from '@/v3/domain/@v2/mental-health/enums/medicalProfileTypes.enum'

export const medicalProfileTypesTranslatedMap = {
  [medicalProfileTypes.DOCTOR]: 'Médico',
  [medicalProfileTypes.PEDIATRICIAN]: 'Pediatra',
  [medicalProfileTypes.SPEECH_THERAPIST]: 'Fonoaudiólogo',
  [medicalProfileTypes.OCCUPATIONAL_THERAPIST]: 'Terapeuta Ocupacional',
  [medicalProfileTypes.PSYCHOLOGIST]: 'Psicólogo',
  [medicalProfileTypes.PSYCHIATRIST]: 'Psiquiatra',
  [medicalProfileTypes.NUTRITIONIST]: 'Nutricionista',
  [medicalProfileTypes.PHYSIOTHERAPIST]: 'Fisioterapeuta',
  [medicalProfileTypes.NEUROPEDIATRICIAN]: 'Neuropediatra',
}
