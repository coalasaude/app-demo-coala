/* eslint-disable @typescript-eslint/no-for-in-array */
import { useRouter } from 'next/router'

import { ROUTES } from '@/constants/routes'

export const useBuildRouteByParam = (stopInParam: string) => {
  const router = useRouter()
  const basePath = ROUTES.MODULES.APP

  if (!router.pathname.includes(stopInParam)) {
    return basePath
  }

  const splitted = router.pathname.split('/')
  let route = ''

  for (const currentRoute in splitted) {
    const value = splitted[currentRoute]
    if (!value) {
      continue
    }
    if (value.includes(stopInParam)) {
      route += `/${router.query[stopInParam]}`
      break
    }
    route += `/${value}`
  }

  return route
}
