import { HealthUnitPaymentMethods } from '@/v3/domain/api/ApiHealthUnitResponse'

export const HEALTH_UNIT_PAYMENT_METHOD_DESCRIPTIONS = {
  [HealthUnitPaymentMethods.BILLING]: 'Boleto',
  [HealthUnitPaymentMethods.CARD]: 'Cartão',
  [HealthUnitPaymentMethods.PIX]: 'Pix',
  [HealthUnitPaymentMethods.TRANSFER]: 'Transferência',
}

export const HEALTH_UNIT_PAYMENT_METHOD_OPTIONS = [
  {
    label: HEALTH_UNIT_PAYMENT_METHOD_DESCRIPTIONS[HealthUnitPaymentMethods.BILLING],
    value: HealthUnitPaymentMethods.BILLING,
  },
  {
    label: HEALTH_UNIT_PAYMENT_METHOD_DESCRIPTIONS[HealthUnitPaymentMethods.CARD],
    value: HealthUnitPaymentMethods.CARD,
  },
  {
    label: HEALTH_UNIT_PAYMENT_METHOD_DESCRIPTIONS[HealthUnitPaymentMethods.PIX],
    value: HealthUnitPaymentMethods.PIX,
  },
  {
    label: HEALTH_UNIT_PAYMENT_METHOD_DESCRIPTIONS[HealthUnitPaymentMethods.TRANSFER],
    value: HealthUnitPaymentMethods.TRANSFER,
  },
]
