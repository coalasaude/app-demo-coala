export enum AppointmentFinishedStatus {
  EMERGENCY_ROOM = 'EMERGENCY_ROOM',
  SAMU_FIREFIGHTER = 'SAMU_FIREFIGHTER',
  OUTPATIENT_INVESTIGATION = 'OUTPATIENT_INVESTIGATION',
  CALL_CENTER = 'CALL_CENTER',
  INVALID = 'INVALID',
  EVASION = 'EVASION',
}

export enum AppointmentCategory {
  APPOINTMENT = 'Pronto atendimento',
  SCHEDULED_APPOINTMENT = 'Agendamento',
}

export enum AppointmentCategoryDescription {
  IS_APPOINTMENT = 'IS_APPOINTMENT',
  IS_SCHEDULED_APPOINTMENT = 'IS_SCHEDULED_APPOINTMENT',
}

export const AppointmentCategoryType = [
  {
    label: AppointmentCategory.APPOINTMENT,
    value: AppointmentCategoryDescription.IS_APPOINTMENT,
  },
  {
    label: AppointmentCategory.SCHEDULED_APPOINTMENT,
    value: AppointmentCategoryDescription.IS_SCHEDULED_APPOINTMENT,
  },
]

export const AppointmentFinishedStatusDescription: Record<string, string> = {
  [AppointmentFinishedStatus.CALL_CENTER]: 'Resolução via teleatendimento',
  [AppointmentFinishedStatus.SAMU_FIREFIGHTER]: 'Remoção por SAMU/Bombeiro',
  [AppointmentFinishedStatus.EMERGENCY_ROOM]: 'Encaminhamento ao pronto-socorro',
  [AppointmentFinishedStatus.OUTPATIENT_INVESTIGATION]:
    'Encaminhamento para investigação ambulatorial',
  [AppointmentFinishedStatus.INVALID]: 'Solicitação inválida',
  [AppointmentFinishedStatus.EVASION]: 'Evasão',
}

export const AppointmentFinishedStatusDescriptionMobile: Record<string, string> = {
  [AppointmentFinishedStatus.CALL_CENTER]: 'Res. via teleatendimento',
  [AppointmentFinishedStatus.SAMU_FIREFIGHTER]: 'Rem. por SAMU/Bombeiro',
  [AppointmentFinishedStatus.EMERGENCY_ROOM]: 'Enc. ao pronto-socorro',
  [AppointmentFinishedStatus.OUTPATIENT_INVESTIGATION]: 'Enc. pra investigação ambulatorial',
  [AppointmentFinishedStatus.INVALID]: 'Solicitação inválida',
  [AppointmentFinishedStatus.EVASION]: 'Evasão',
}

export const AppointmentFinishedStatusType = [
  {
    label: AppointmentFinishedStatusDescription[AppointmentFinishedStatus.CALL_CENTER],
    value: AppointmentFinishedStatus.CALL_CENTER,
  },
  {
    label: AppointmentFinishedStatusDescription[AppointmentFinishedStatus.SAMU_FIREFIGHTER],
    value: AppointmentFinishedStatus.SAMU_FIREFIGHTER,
  },
  {
    label: AppointmentFinishedStatusDescription[AppointmentFinishedStatus.EMERGENCY_ROOM],
    value: AppointmentFinishedStatus.EMERGENCY_ROOM,
  },
  {
    label: AppointmentFinishedStatusDescription[AppointmentFinishedStatus.OUTPATIENT_INVESTIGATION],
    value: AppointmentFinishedStatus.OUTPATIENT_INVESTIGATION,
  },
  {
    label: AppointmentFinishedStatusDescription[AppointmentFinishedStatus.INVALID],
    value: AppointmentFinishedStatus.INVALID,
  },
  {
    label: AppointmentFinishedStatusDescription[AppointmentFinishedStatus.EVASION],
    value: AppointmentFinishedStatus.EVASION,
  },
]
