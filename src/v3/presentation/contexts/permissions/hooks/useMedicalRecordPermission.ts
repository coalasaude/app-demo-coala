import { Permissions } from '@/constants/permissions'
import { useAuth } from '@/v3/presentation/hooks/useAuth'

export const useMedicalRecordPermission = () => {
  const { auth } = useAuth()
  const permissionsData = auth.permissions

  const hasPermission = permissionsData?.some(
    (permission) => permission.name === Permissions.MANAGE_HEALTH_HISTORY,
  )

  return Boolean(hasPermission)
}
