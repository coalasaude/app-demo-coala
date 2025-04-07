import { useAuth } from '@/v3/presentation/hooks/useAuth'

export const useIsAdminPermission = () => {
  const { auth } = useAuth()

  const isAdmin = auth.user?.isAdmin

  return Boolean(isAdmin)
}
