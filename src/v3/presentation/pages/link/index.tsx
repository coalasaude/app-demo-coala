import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { PageSpinner } from '@/components/Spinner'
import { getMobileOperatingSystem } from '@/utils/getMobileOperationSystem'

import { useAppRedirect } from '../../hooks/useAppRedirect'

export const DeepLinkPage = () => {
  const router = useRouter()
  const operationSystem = getMobileOperatingSystem()
  const { onGoToApp } = useAppRedirect()

  useEffect(() => {
    const path = window.location.pathname + window.location.search
    const redirectPath = path.split('/').slice(2).join('/') || ''

    const onRedirect = () => router.replace(`/${redirectPath}`)
    
    if (operationSystem !== 'unknown') {
      onGoToApp({ path })
      setTimeout(onRedirect, 3000)
    } else {
      onRedirect()
    }
  }, [onGoToApp, operationSystem, router])

  return <PageSpinner isVisible />
}

export default DeepLinkPage
