
import { useCallback } from 'react'

import { getMobileOperatingSystem } from '@/utils/getMobileOperationSystem'

import { useAuth } from './useAuth'

export const useAppRedirect = () => {
    const operationSystem = getMobileOperatingSystem()
    const { auth } = useAuth()

    const onGoToApp = useCallback((params?: { path?: string, fallBack?: () => void }) => {
      const redirectPath = params?.path || window.location.pathname + window.location.search
      
      if (operationSystem !== 'unknown') {
        const url = new URL(redirectPath, window.location.origin)

        if (auth.accessToken) url.searchParams.append('accessToken', auth.accessToken)
        if (auth.refreshToken) url.searchParams.append('refreshToken', auth.refreshToken)

        const pathWithTokens = `${url.pathname}${url.search}`
        window.location.href = `com.coala.appcoala://coalasaude.com.br${pathWithTokens}`

        params?.fallBack?.()
      }
    }, [auth.accessToken, auth.refreshToken, operationSystem])


    return { onGoToApp }
}
