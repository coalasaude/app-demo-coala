import {
  UserContact,
  MeansContact,
  PatientEvolution,
  TypeAssistance,
  WhoLibered,
  AdherenceToTreatment,
} from '@/v3/domain/follow-up'

export const UserContactDescription: Record<string, string> = {
  [UserContact.RESPONSIBLE]: 'Responsável',
  [UserContact.COLLABORATOR]: 'Colaborador',
  [UserContact.OTHER]: 'Outro',
}

export const UserContactOptions = [
  {
    label: UserContactDescription[UserContact.RESPONSIBLE],
    value: UserContact.RESPONSIBLE,
  },
  {
    label: UserContactDescription[UserContact.COLLABORATOR],
    value: UserContact.COLLABORATOR,
  },
  {
    label: UserContactDescription[UserContact.OTHER],
    value: UserContact.OTHER,
  },
]

export const WhoLiberedDescription: Record<string, string> = {
  [WhoLibered.COALA]: 'Coala',
  [WhoLibered.EXTERNAL_PROFESSIONAL]: 'Profissional externo',
}

export const WholiberedOptions = [
  {
    label: WhoLiberedDescription[WhoLibered.COALA],
    value: WhoLibered.COALA,
  },
  {
    label: WhoLiberedDescription[WhoLibered.EXTERNAL_PROFESSIONAL],
    value: WhoLibered.EXTERNAL_PROFESSIONAL,
  },
]

export const MeansContactDescription: Record<string, string> = {
  [MeansContact.TELEPHONE]: 'Telefone',
  [MeansContact.EMAIL]: 'E-mail',
  [MeansContact.WHATS_APP]: 'WhatsApp',
  [MeansContact.CHAT]: 'Chat',
}

export const MeansContactOptions = [
  {
    label: MeansContactDescription[MeansContact.TELEPHONE],
    value: MeansContact.TELEPHONE,
  },
  {
    label: MeansContactDescription[MeansContact.EMAIL],
    value: MeansContact.EMAIL,
  },
  {
    label: MeansContactDescription[MeansContact.WHATS_APP],
    value: MeansContact.WHATS_APP,
  },
  {
    label: MeansContactDescription[MeansContact.CHAT],
    value: MeansContact.CHAT,
  },
]

export const PatientEvolutionDescription: Record<string, string> = {
  [PatientEvolution.RETRIEVED]: 'Recuperado',
  [PatientEvolution.BETTER]: 'Melhorado',
  [PatientEvolution.MAINTAINED]: 'Inalterado',
  [PatientEvolution.WORST]: 'Piorado',
}

export const PatientEvolutionOptions = [
  {
    label: PatientEvolutionDescription[PatientEvolution.RETRIEVED],
    value: PatientEvolution.RETRIEVED,
  },
  {
    label: PatientEvolutionDescription[PatientEvolution.BETTER],
    value: PatientEvolution.BETTER,
  },
  {
    label: PatientEvolutionDescription[PatientEvolution.MAINTAINED],
    value: PatientEvolution.MAINTAINED,
  },
  {
    label: PatientEvolutionDescription[PatientEvolution.WORST],
    value: PatientEvolution.WORST,
  },
]

export const TypeAssistanceDescription: Record<string, string> = {
  [TypeAssistance.HOSPITAL]: 'Hospital',
  [TypeAssistance.ORTHOPEDICS]: 'Ortopedia',
  [TypeAssistance.OPHTHALMOLOGY]: 'Oftalmologia',
  [TypeAssistance.DENTISTRY]: 'Odontologia',
  [TypeAssistance.OTORHINOLARYNGOLOGY]: 'Otorrinolaringologia',
  [TypeAssistance.PEDIATRIC_ASSISTANT]: 'Pediatra assistente',
}

export const TypeAssistanceOptions = [
  {
    label: TypeAssistanceDescription[TypeAssistance.HOSPITAL],
    value: TypeAssistance.HOSPITAL,
  },
  {
    label: TypeAssistanceDescription[TypeAssistance.ORTHOPEDICS],
    value: TypeAssistance.ORTHOPEDICS,
  },
  {
    label: TypeAssistanceDescription[TypeAssistance.OPHTHALMOLOGY],
    value: TypeAssistance.OPHTHALMOLOGY,
  },
  {
    label: TypeAssistanceDescription[TypeAssistance.DENTISTRY],
    value: TypeAssistance.DENTISTRY,
  },
  {
    label: TypeAssistanceDescription[TypeAssistance.OTORHINOLARYNGOLOGY],
    value: TypeAssistance.OTORHINOLARYNGOLOGY,
  },
  {
    label: TypeAssistanceDescription[TypeAssistance.PEDIATRIC_ASSISTANT],
    value: TypeAssistance.PEDIATRIC_ASSISTANT,
  },
]

export const AdherenceToTreatmentDescription: Record<string, string> = {
  [AdherenceToTreatment.NOT_STARTED]: 'Não iniciado',
  [AdherenceToTreatment.CONTINUOUS]: 'Continuado',
  [AdherenceToTreatment.INTERMITTENT]: 'Intermitente',
  [AdherenceToTreatment.DISCONTINUED]: 'Descontinuado',
  [AdherenceToTreatment.COMPLETED]: 'Concluído',
}

export const AdherenceToTreatmentOptions = [
  {
    label: AdherenceToTreatmentDescription[AdherenceToTreatment.NOT_STARTED],
    value: AdherenceToTreatment.NOT_STARTED,
  },
  {
    label: AdherenceToTreatmentDescription[AdherenceToTreatment.CONTINUOUS],
    value: AdherenceToTreatment.CONTINUOUS,
  },
  {
    label: AdherenceToTreatmentDescription[AdherenceToTreatment.INTERMITTENT],
    value: AdherenceToTreatment.INTERMITTENT,
  },
  {
    label: AdherenceToTreatmentDescription[AdherenceToTreatment.DISCONTINUED],
    value: AdherenceToTreatment.DISCONTINUED,
  },
  {
    label: AdherenceToTreatmentDescription[AdherenceToTreatment.COMPLETED],
    value: AdherenceToTreatment.COMPLETED,
  },
]
