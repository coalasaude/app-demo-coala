import { AUTHENTICATED_ROUTES, NEW_ROUTES } from '@/constants/routes'

const API_FILTERS_WHITELIST_ROUTES = [
  NEW_ROUTES.AUTHENTICATED.APPOINTMENT.path,
  AUTHENTICATED_ROUTES.HEALTH_HISTORIC,
  AUTHENTICATED_ROUTES.USERS,
]

export class ApiFilters {
  static isWhitelistedRoute(pathname: string) {
    return API_FILTERS_WHITELIST_ROUTES.some((route) => pathname.includes(route))
  }
}
