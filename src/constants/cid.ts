import { CidAppointmentType } from '@/types/cid'

export const cidTypeOptions = [
  { value: CidAppointmentType.HYPOTHESIS, label: 'Hipótese' },
  { value: CidAppointmentType.FINAL, label: 'Diagnóstico Final' },
]

export const cidTypeDescription: Record<string, string> = {
  [CidAppointmentType.HYPOTHESIS]: 'Hipótese',
  [CidAppointmentType.FINAL]: 'Diagnóstico Final',
}
