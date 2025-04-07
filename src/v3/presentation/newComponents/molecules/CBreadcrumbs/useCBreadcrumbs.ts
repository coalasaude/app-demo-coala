import { useRouter } from 'next/router'

import { NEW_ROUTES } from '@/constants/routes'

export const useActiveBreadcrumbRoutes = () => {
  const { pathname } = useRouter()

  const getSubroutes = (data: Record<string, any>) => {
    const { path, name } = data
    const subRoutes = Object.keys(data).reduce<{ path: string; name: string }[]>((result, key) => {
      const value = data[key]
      if (typeof value !== 'object') {
        return result
      }
      const subRoutes = getSubroutes(value)
      result.push(...subRoutes)
      return result
    }, [])
    return [{ path, name }, ...subRoutes]
  }

  const flattedRoutes = Object.keys(NEW_ROUTES.AUTHENTICATED).reduce<
    { name: string; path: string }[]
  >((result, key) => {
    const obj = NEW_ROUTES.AUTHENTICATED[key as keyof typeof NEW_ROUTES.AUTHENTICATED]
    result.push(...getSubroutes(obj))
    return result
  }, [])

  const routes = flattedRoutes.filter((r) => pathname.includes(r.path))
  return routes
}
