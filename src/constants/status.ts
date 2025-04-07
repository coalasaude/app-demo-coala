import { AppointmentStatus, ScheduledAppointmentStatus } from '@/types/appointment'
import { RefundStatus, RejectedRefundStatus } from '@/types/refund'
import { UserStatus } from '@/types/user'
import { VaccineDocumentStatus } from '@/types/vaccine'

export const StatusDescription: Record<string, string> = {
  [UserStatus.ACTIVE]: 'Ativo',
  [UserStatus.FIRST_ACCESS]: 'Primeiro acesso pendente',
  [UserStatus.INACTIVE]: 'Inativo',
  [UserStatus.NO_ACCESS]: 'Sem Acesso',
  [UserStatus.TRIAL]: 'Teste Gratuito',
}

export const StatusDescriptionOptions = [
  {
    label: StatusDescription[UserStatus.ACTIVE],
    value: UserStatus.ACTIVE,
  },
  {
    label: StatusDescription[UserStatus.FIRST_ACCESS],
    value: UserStatus.FIRST_ACCESS,
  },
  {
    label: StatusDescription[UserStatus.NO_ACCESS],
    value: UserStatus.NO_ACCESS,
  },
]

export const AppointmentDataStatusDescription: Record<string, string> = {
  [UserStatus.ACTIVE]: 'Ativo',
  [UserStatus.INACTIVE]: 'Inválido',
}

export const AppointmentStatusDescription: Record<string, string> = {
  [AppointmentStatus.FINISHED]: 'Finalizado',
  [AppointmentStatus.FOLLOW_UP]: 'Acompanhamento',
  [AppointmentStatus.IN_ATTENDANCE]: 'Atendimento',
  [AppointmentStatus.WAITING_ATTENDANCE]: 'Solicitação',
  [AppointmentStatus.WAITING_DOCTOR]: 'Aguardando médico',
  [AppointmentStatus.WAITING_NURSE]: 'Aguardando enfermagem',
}

export const AppointmentStatusDescriptionMobile: Record<string, string> = {
  [AppointmentStatus.FINISHED]: 'Finalizado',
  [AppointmentStatus.FOLLOW_UP]: 'Acompanhamento',
  [AppointmentStatus.IN_ATTENDANCE]: 'Atendimento',
  [AppointmentStatus.WAITING_ATTENDANCE]: 'Solicitação',
  [AppointmentStatus.WAITING_DOCTOR]: 'Ag. Médico',
  [AppointmentStatus.WAITING_NURSE]: 'Ag. Enfermagem',
}

export const VaccineDocumentStatusDescription: Record<string, string> = {
  [VaccineDocumentStatus.FAILED]: 'Falha na validação',
  [VaccineDocumentStatus.PARTIALLY_VALIDATED]: 'Parcialmente validado',
  [VaccineDocumentStatus.PENDING]: 'Pendente de validação',
  [VaccineDocumentStatus.VALIDATED]: 'Validado',
}

export const ScheduledAppointmentStatusDescription: Record<string, string> = {
  [ScheduledAppointmentStatus.CANCELED]: 'Cancelado',
  [ScheduledAppointmentStatus.FINISHED]: 'Finalizado',
  [ScheduledAppointmentStatus.SCHEDULED]: 'Agendado',
  [ScheduledAppointmentStatus.STARTED]: 'Iniciado',
}

export const AppointmentStatusType = [
  {
    label: AppointmentStatusDescription[AppointmentStatus.WAITING_NURSE],
    value: AppointmentStatus.WAITING_NURSE,
  },
  {
    label: AppointmentStatusDescription[AppointmentStatus.WAITING_DOCTOR],
    value: AppointmentStatus.WAITING_DOCTOR,
  },
  {
    label: AppointmentStatusDescription[AppointmentStatus.WAITING_ATTENDANCE],
    value: AppointmentStatus.WAITING_ATTENDANCE,
  },
  {
    label: AppointmentStatusDescription[AppointmentStatus.IN_ATTENDANCE],
    value: AppointmentStatus.IN_ATTENDANCE,
  },
  {
    label: AppointmentStatusDescription[AppointmentStatus.FINISHED],
    value: AppointmentStatus.FINISHED,
  },
]

export const RefundStatusDescription: Record<string, string> = {
  [RefundStatus.DEFERRED]: 'Deferido',
  [RefundStatus.IN_ANALYSIS]: 'Em análise',
  [RefundStatus.PARTIALLY_DEFERRED]: 'Parcialmente deferido',
  [RefundStatus.REJECTED]: 'Rejeitado',
  [RefundStatus.AWAITING_REVIEW]: 'Aguardando revisão',
  [RefundStatus.CANCELED]: 'Cancelado',
}

export const RejectedRefundStatusDescription: Record<string, string> = {
  [RejectedRefundStatus.INVALID_PROOF]: 'Prova inválida',
  [RejectedRefundStatus.MISSING_PROOF]: 'Prova ausente',
  [RejectedRefundStatus.INSUFFICIENT_COVERAGE]: 'Cobertura insuficiente',
  [RejectedRefundStatus.OTHERS]: 'Outros',
}
