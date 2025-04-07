import { NEW_ROUTES } from '@/constants/routes'

const API_FILTERS_WHITELIST_ROUTES = [
  NEW_ROUTES.AUTHENTICATED.APPOINTMENT.path,
  NEW_ROUTES.AUTHENTICATED.USERS.HEALTH_HISTORIC.path,
  NEW_ROUTES.AUTHENTICATED.USERS.path,
]

export class ApiFilters {
  static isWhitelistedRoute(pathname: string) {
    return API_FILTERS_WHITELIST_ROUTES.some((route) => pathname.includes(route))
  }
}
