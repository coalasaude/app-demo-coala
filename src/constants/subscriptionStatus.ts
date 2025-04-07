import { SubscriptionStatus } from '@/types/subscription'

export const SubscriptionStatusDescription = {
  [SubscriptionStatus.ACTIVE]: 'Ativa',
  [SubscriptionStatus.CANCELED]: 'Cancelada',
  [SubscriptionStatus.PAST_DUE]: 'Atrasada',
  [SubscriptionStatus.INCOMPLETE]: 'Aguardando pagamento',
  [SubscriptionStatus.TRIALING]: 'Em teste',
  [SubscriptionStatus.UNPAID]: 'Não paga',
  [SubscriptionStatus.INCOMPLETE_EXPIRED]: 'Pagamento expirado',
}
