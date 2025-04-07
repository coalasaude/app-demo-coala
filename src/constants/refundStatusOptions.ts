import { RefundStatus } from '@/types/refund'

export const RefundOptions = [
  {
    value: RefundStatus.DEFERRED,
    label: 'Deferido',
  },
  {
    value: RefundStatus.PARTIALLY_DEFERRED,
    label: 'Parcialmente deferido',
  },
  {
    value: RefundStatus.REJECTED,
    label: 'Rejeitado',
  },
  {
    value: RefundStatus.IN_ANALYSIS,
    label: 'Em análise',
  },
  {
    value: RefundStatus.AWAITING_REVIEW,
    label: 'Aguardando revisão',
  },
  {
    value: RefundStatus.CANCELED,
    label: 'Cancelado',
  },
]
