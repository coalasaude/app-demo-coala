import { Permissions } from '@/constants/permissions'
import { useAuth } from '@/v3/presentation/hooks/useAuth'

export const useManageHealthUnit = () => {
  const { auth } = useAuth()
  const permissionsData = auth.permissions

  const hasPermission = permissionsData?.some(
    (permission) => permission.name === Permissions.VIEW_HEALTH_UNIT,
  )

  return Boolean(hasPermission)
}
