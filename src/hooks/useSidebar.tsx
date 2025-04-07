import { AuthState } from '@/v3/infra/services/AuthStorage'
import { SidebarConfig } from '@/v3/presentation/newComponents/layout/CSideBar/config'
import { useAuth } from '@/v3/presentation/hooks/useAuth'

export const useSideBar = () => {
  const { auth } = useAuth()
  return getSidebar(auth)
}

export const getSidebar = (auth: AuthState) => {
  return SidebarConfig()?.filter(({ hasPermission }) => !hasPermission || hasPermission(auth))
}
