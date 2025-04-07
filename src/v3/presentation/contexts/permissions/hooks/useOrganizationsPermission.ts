import { Permissions } from '@/constants/permissions'
import { useAuth } from '@/v3/presentation/hooks/useAuth'

export const useOrganizationPermission = () => {
  const { auth } = useAuth()
  const permissionsData = auth.permissions

  const hasPermission = permissionsData?.some(
    (permission) => permission.name === Permissions.VIEW_ORGANIZATIONS,
  )

  return Boolean(hasPermission)
}
