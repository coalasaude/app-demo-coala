import { NEW_ROUTES } from '@/constants/routes'

export const formatRouterMaterials = (name: string, routerPath: string) => {
  const formattedRouterPath = routerPath.replace(NEW_ROUTES.AUTHENTICATED.MATERIALS.path, '')

  const formatted = `${NEW_ROUTES.AUTHENTICATED.MATERIALS.VIEW.path}${formattedRouterPath}/${name}`

  return routerPushMaterialsWithSaaSUrl(formatted)
}

const routerPushMaterialsWithSaaSUrl = (url: string) => {
  const { origin } = window.location

  return `${origin}${url}`
}
