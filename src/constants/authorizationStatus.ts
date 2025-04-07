import { AuthorizationStatus } from '@/types/medicine'

export const AuthorizationStatusDescription = {
  [AuthorizationStatus.PENDING]: 'Pendente',
  [AuthorizationStatus.AUTHORIZED]: 'Autorizado',
  [AuthorizationStatus.AUTHORIZED_SCHOOL]: 'Autorizado na escola',
}
