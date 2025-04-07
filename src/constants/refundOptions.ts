import { RefundType } from '@/types/refund'

export const RefundOptions = [
  {
    label: RefundType.TED,
    value: RefundType.TED,
  },
  {
    label: RefundType.PIX,
    value: RefundType.PIX,
  },
  {
    label: 'Boleto bancário',
    value: RefundType.BOLETO,
  },
]
