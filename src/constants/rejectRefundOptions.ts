import { RejectedRefundStatus } from '@/types/refund'

export const RejectRefundOptions = [
  {
    value: RejectedRefundStatus.INVALID_PROOF,
    label: 'Prova inválida',
  },
  {
    value: RejectedRefundStatus.MISSING_PROOF,
    label: 'Prova ausente',
  },
  {
    value: RejectedRefundStatus.INSUFFICIENT_COVERAGE,
    label: 'Cobertura insuficiente',
  },
  {
    value: RejectedRefundStatus.OTHERS,
    label: 'Outros',
  },
]
