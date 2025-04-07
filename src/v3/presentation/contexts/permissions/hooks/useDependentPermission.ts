import { useAuth } from '@/v3/presentation/hooks/useAuth'

export const useDependentPermission = () => {
  const { auth } = useAuth()

  return Boolean(auth.hasChildren)
}
