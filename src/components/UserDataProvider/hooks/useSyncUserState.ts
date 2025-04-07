import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { isEqual } from 'lodash'

import { usePrevious } from '@/hooks/usePrevious'
import { useAuth } from '@/v3/presentation/hooks/useAuth'
import { ROUTES } from '@/constants/routes'
import { getSidebar } from '@/hooks/useSidebar'
import { MePermissions } from '@/v3/domain/@v2/users/user-me-permissions.model'
import { useLazyFetchMePermissions } from '@/v3/presentation/hooks/api/@v2/users/me/useLazyFetchMePermissions'

import { useFetchUserData } from './useFetchUserData'

export const useSyncUserState = (
  setIsRequestFinished: (value: boolean) => void,
  isRequestFinished: boolean,
  permissionsList?: MePermissions[],
) => {
  const { auth, isLoaded } = useAuth()
  const router = useRouter()
  const previousPermissions = usePrevious(permissionsList)

  const getUserData = useFetchUserData()
  const { fetch: fetchMePermissions } = useLazyFetchMePermissions()

  useEffect(() => {
    if (!auth?.user?.id && auth.accessToken) {
      getUserData()
    }
  }, [auth.accessToken, auth?.user?.id, getUserData])

  useEffect(() => {
    if (!auth.accessToken && isRequestFinished) {
      setIsRequestFinished(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.accessToken, isRequestFinished])

  useEffect(() => {
    if (
      previousPermissions !== undefined &&
      !isEqual(previousPermissions, permissionsList) &&
      permissionsList
    ) {
      const sidebar = getSidebar(auth)
      router.push(`${ROUTES.MODULES.APP}${sidebar?.[0].route({})}`)
    }
  }, [auth, permissionsList, previousPermissions, router])

  useEffect(() => {
    if (auth.accessToken && router.pathname !== '/' && !auth.permissions) {
      fetchMePermissions()
    }
  }, [auth.accessToken, fetchMePermissions, router.pathname, auth.user, auth.permissions])

  return isLoaded
}
