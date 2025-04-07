import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { PageHeader } from '@/v3/presentation/newComponents'
import { NEW_ROUTES } from '@/constants/routes'
import { WebViewManager } from '@/services/WebView'

import { getRoutesByTypeAndName } from '../utils/routes.enum'

export const MaterialsView = () => {
  const router = useRouter()
  const viewPath = NEW_ROUTES.AUTHENTICATED.MATERIALS.VIEW.path
  const materialsPath = NEW_ROUTES.AUTHENTICATED.MATERIALS.path

  useEffect(() => {
    const urlMatch = router.asPath.match(/\/view\/[^/]+\/(.+)/)?.[1]
    const previousPathMatch = router.asPath.match(/(.+\/view\/[^/]+)/)?.[1]

    if (urlMatch && previousPathMatch) {
      const keepRest = urlMatch?.replace(/^[^/]*\//, '')
      const urlRest = router.asPath.replace(viewPath, '').replace(`/${keepRest}`, '')
      const previousPath = urlRest.replaceAll(`${viewPath}/`, '')
      const externalUrl = getRoutesByTypeAndName(previousPath, keepRest)

      WebViewManager.open(externalUrl, '_blank')
      router.push(`${materialsPath}${previousPath}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <PageHeader title='Visualização de material' onBack={() => router.push(materialsPath)} />
}

export default MaterialsView
