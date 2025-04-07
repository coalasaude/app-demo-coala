import { DefaultStatus } from './status'
import { User } from './user'

export interface ProfessionalReference {
  PROFESSIONAL_TYPE_DESCRIPTIONS: any
  id: number
  professional_type: ProfessionalType
  name: string
  telephone: string
  email: string
  user: User
  user_id: number
  status: DefaultStatus
  created_at: string
  updated_at: string | null
}

export enum ProfessionalType {
  DOCTOR = 'DOCTOR',
  SPEECH_THERAPIST = 'SPEECH_THERAPIST',
  OCCUPATIONAL_THERAPIST = 'OCCUPATIONAL_THERAPIST',
  PSYCHOLOGIST = 'PSYCHOLOGIST',
  NUTRITIONIST = 'NUTRITIONIST',
  PEDIATRICIAN = 'PEDIATRICIAN',
  PSYCHIATRIST = 'PSYCHIATRIST',
  PHYSIOTHERAPIST = 'PHYSIOTHERAPIST',
}

export const PROFESSIONAL_TYPE_DESCRIPTIONS = {
  [ProfessionalType.DOCTOR]: 'Médico assistente',
  [ProfessionalType.SPEECH_THERAPIST]: 'Fonoaudiologo',
  [ProfessionalType.OCCUPATIONAL_THERAPIST]: 'Terapeuta Ocupacional',
  [ProfessionalType.PSYCHOLOGIST]: 'Psicólogo',
  [ProfessionalType.NUTRITIONIST]: 'Nutricionista',
  [ProfessionalType.PEDIATRICIAN]: 'Pediatra',
  [ProfessionalType.PSYCHIATRIST]: 'Psiquiatra',
  [ProfessionalType.PHYSIOTHERAPIST]: 'Fisioterapeuta',
}

export const ProfessionalTypeOptions = [
  {
    label: PROFESSIONAL_TYPE_DESCRIPTIONS[ProfessionalType.DOCTOR],
    value: ProfessionalType.DOCTOR,
  },
  {
    label: PROFESSIONAL_TYPE_DESCRIPTIONS[ProfessionalType.SPEECH_THERAPIST],
    value: ProfessionalType.SPEECH_THERAPIST,
  },
  {
    label: PROFESSIONAL_TYPE_DESCRIPTIONS[ProfessionalType.OCCUPATIONAL_THERAPIST],
    value: ProfessionalType.OCCUPATIONAL_THERAPIST,
  },
  {
    label: PROFESSIONAL_TYPE_DESCRIPTIONS[ProfessionalType.PSYCHOLOGIST],
    value: ProfessionalType.PSYCHOLOGIST,
  },
  {
    label: PROFESSIONAL_TYPE_DESCRIPTIONS[ProfessionalType.NUTRITIONIST],
    value: ProfessionalType.NUTRITIONIST,
  },
  {
    label: PROFESSIONAL_TYPE_DESCRIPTIONS[ProfessionalType.PEDIATRICIAN],
    value: ProfessionalType.PEDIATRICIAN,
  },
  {
    label: PROFESSIONAL_TYPE_DESCRIPTIONS[ProfessionalType.PSYCHIATRIST],
    value: ProfessionalType.PSYCHIATRIST,
  },
  {
    label: PROFESSIONAL_TYPE_DESCRIPTIONS[ProfessionalType.PHYSIOTHERAPIST],
    value: ProfessionalType.PHYSIOTHERAPIST,
  },
]
