import { useRouter } from 'next/router'
import React from 'react'

import { ROUTES } from '@/constants/routes'

import { PROTECTED_BASE_ROUTES } from './protected-routes'

/**
 * Protege rotas base da aplicação. Todas as subRotas desta rota também terão proteção.
 *
 * Exemplo: /manager/rota_base/subRotas. Ttodas as rotas dentro de rota_base serão protegidas.
 *
 * Permissões são obtidas através do arquivo protected-routes.ts
 */
export const BaseRoutesGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const basePath = ROUTES.MODULES.APP
  const isModuleRoute = basePath && !!router.pathname.includes(basePath)
  const currentRoute = router.pathname.replace(basePath ? `${basePath}/` : '', '')?.split('/')
  const protectedRoute =
    (currentRoute?.length && PROTECTED_BASE_ROUTES[`/${currentRoute[0]}`]) ?? null

  if (isModuleRoute && protectedRoute) {
    /*
    if (!auth?.selectedModule?.role || !protectedRoute.includes(auth.selectedModule.role)) {
      return <div>ops, você não tem permissão de acesso</div>
    }
    */
  }

  return <>{children}</>
}
