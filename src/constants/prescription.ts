import { PrescriptionEnum } from '@/types/prescription'

export const PrescriptionDescription: Record<string, string> = {
  [PrescriptionEnum.SIMPLE]: 'Simples',
  [PrescriptionEnum.SPECIAL_CONTROL]: 'Controle especial',
}
