import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { useAuth } from '@/v3/presentation/hooks/useAuth'
import { usePrevious } from '@/hooks/usePrevious'
import { ApiFilters } from '@/services/ApiFilters'

export const ApiFiltersController = () => {
  const router = useRouter()
  const { setAuth } = useAuth()
  const previousRoute = usePrevious(router.pathname || '')

  useEffect(() => {
    const isCurrentWhitelisted = ApiFilters.isWhitelistedRoute(router.pathname)
    const isPreviousWhitelisted = ApiFilters.isWhitelistedRoute(previousRoute || '')
    if (!isCurrentWhitelisted && isPreviousWhitelisted) {
      setAuth({
        selectedInstitution: undefined,
        selectedChildren: undefined,
        selfAccess: false,
      })
    }
  }, [router.pathname, previousRoute, setAuth])
  return null
}
