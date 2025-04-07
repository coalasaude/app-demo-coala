import { DefaultStatus } from '@/types/status'

export const DOCUMENT_STATUS_DESCRIPTION: Record<string, string> = {
  [DefaultStatus.ACTIVE]: 'Válido',
  [DefaultStatus.INACTIVE]: 'Inválido',
}
