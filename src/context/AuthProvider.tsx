import { usePostHog } from 'posthog-js/react'
import React, { createContext, useCallback, useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'

import { queryClient } from '@/pages/_app'
import { useModalContext } from '@/v3/presentation/components/Modal'
import { AuthState, AuthStorage } from '@/services/AuthStorage'
import { getCookies } from '@/utils/manage-cookies'
import { extractUrlTokens } from '@/v3/utils/extractUrlTokens'
import { removeUrlTokens } from '@/v3/utils/removeUrlTokens'
import { eventBus, EventBusEnum } from '@/v3/utils/event-bus'
import { componentMap, magicLinkStrategyMap, MagicLinkType } from '@/types/magicLinkStrategy'

import { MagicLinkExpiredNotActivateModal } from './modals/MagicLinkExpiredModal'

interface AuthContext {
  auth: AuthState
  setAuth: (auth: Partial<AuthState>) => void
  logout: () => void
  isLoaded: boolean
}

interface DecodedToken {
  isActivated: boolean
  type: MagicLinkType
  exp: number
}

export const AuthContext = createContext<AuthContext>({} as AuthContext)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<AuthState>({})
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const storedAuth = getCookies('AT')
  const posthog = usePostHog()
  const { handleModal } = useModalContext()

  const openModal = useCallback(
    ({
      description,
      confirmButtonLabel,
    }: {
      description: React.ReactNode
      confirmButtonLabel: string
    }) => {
      handleModal(
        <MagicLinkExpiredNotActivateModal
          description={description}
          onConfirm={async () => null}
          confirmButtonLabel={confirmButtonLabel}
        />,
      )
    },
    [handleModal],
  )

  const mapperDescription = (isActivated: boolean, type: MagicLinkType) => {
    const strategy = magicLinkStrategyMap[type]
    const key = strategy.getComponentKey(isActivated)
    return componentMap[key]
  }

  const setPosthogidentifyUser = (auth: AuthState) => {
    if (!auth.user?.id || !auth.user?.email) return

    const profiles = auth.user.getProfileNames()

    posthog.identify(`${auth.user?.id}`, {
      email: auth.user?.email,
      name: auth.user?.getFullName(),
      genre: auth.user?.genre,
      isMedical: auth.user?.isMedical,
      isHealthLeader: auth.user?.isHealthLeader,
      isChild: auth.user?.isChild,
      isResponsible: auth.user?.isResponsible,
      userStatus: auth.user?.status,
      profile: profiles?.length ? profiles.join(' / ') : 'Sem perfis',
      institutionsIds: auth.user.getInstitutionsIdsStr(),
    })
  }

  const setAuthConfig = useCallback(
    (updatedAuth: AuthState) => {
      setAuth((prevState) => {
        const { redirectPage, ...newAuth } = {
          ...prevState,
          ...updatedAuth,
        }
        AuthStorage.set(newAuth)
        setPosthogidentifyUser(newAuth)
        return { redirectPage, ...newAuth }
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setAuth],
  )

  const logout = useCallback(() => {
    posthog.reset()
    AuthStorage.saveRedirectRoute = false
    AuthStorage.logout()
    setAuth({})
    queryClient.clear()
    queryClient.invalidateQueries()
  }, [setAuth, posthog])

  useEffect(() => {
    if (!storedAuth?.accessToken) {
      logout()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storedAuth?.accessToken])

  useEffect(() => {
    if (!isLoaded) {
      const auth = getCookies('AT')
      const { accessToken, refreshToken } = extractUrlTokens()
      removeUrlTokens()

      if (accessToken) {
        const decodedToken = jwtDecode<DecodedToken>(accessToken)
        const { isActivated, type, exp } = decodedToken

        if (!isTokenIsExpired(exp)) {
          setAuth({
            accessToken,
            refreshToken,
            ...auth,
          })
        } else {
          const description = mapperDescription(isActivated, type)
          const confirmButtonLabel = isActivated ? 'Entendi' : 'Ativar conta'
          openModal({
            description,
            confirmButtonLabel,
          })
        }
      } else {
        setAuth(auth)
      }

      const timer = setTimeout(() => {
        setIsLoaded(true)
      }, 1000)

      setIsLoaded(true)

      posthog.onFeatureFlags(function () {
        clearTimeout(timer)
        eventBus.emit(EventBusEnum.FEATURE_FLAG_LOAD)

        setIsLoaded(true)
      })
    }
  }, [auth, isLoaded, posthog, openModal])

  const isTokenIsExpired = (exp: number) => {
    return exp < Date.now() / 1000
  }

  useEffect(() => {
    setPosthogidentifyUser(auth)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.user])

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth: setAuthConfig,
        logout,
        isLoaded,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
