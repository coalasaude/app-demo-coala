export enum medicalProfileTypes {
  DOCTOR = 'DOCTOR',
  PEDIATRICIAN = 'PEDIATRICIAN',
  SPEECH_THERAPIST = 'SPEECH_THERAPIST',
  OCCUPATIONAL_THERAPIST = 'OCCUPATIONAL_THERAPIST',
  PSYCHOLOGIST = 'PSYCHOLOGIST',
  PSYCHIATRIST = 'PSYCHIATRIST',
  NUTRITIONIST = 'NUTRITIONIST',
  PHYSIOTHERAPIST = 'PHYSIOTHERAPIST',
  NEUROPEDIATRICIAN = 'NEUROPEDIATRICIAN',
}

export const medicalProfileTranslate = {
  [medicalProfileTypes.DOCTOR]: 'Médico assistente',
  [medicalProfileTypes.SPEECH_THERAPIST]: 'Fonoaudiologo',
  [medicalProfileTypes.OCCUPATIONAL_THERAPIST]: 'Terapeuta Ocupacional',
  [medicalProfileTypes.PSYCHOLOGIST]: 'Psicólogo',
  [medicalProfileTypes.NUTRITIONIST]: 'Nutricionista',
  [medicalProfileTypes.PEDIATRICIAN]: 'Pediatra',
  [medicalProfileTypes.PSYCHIATRIST]: 'Psiquiatra',
  [medicalProfileTypes.PHYSIOTHERAPIST]: 'Fisioterapeuta',
  [medicalProfileTypes.NEUROPEDIATRICIAN]: 'Neuropediatra',
}
