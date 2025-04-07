import { NEW_ROUTES } from '@/constants/routes'
import { WebViewManager } from '@/services/WebView'

import { convertQueryValueInChunks } from './convertQueryInChunks'

export function downloadByProxy({ url }: { url: string }) {
  const proxyUrl = `${NEW_ROUTES.API.FILE_PROXY.path}?${convertQueryValueInChunks({
    queryName: 'url',
    queryValue: url,
  }).toString()}`

  const protocol = window.location.protocol
  const hostname = window.location.hostname
  const port = window.location.port ? `:${window.location.port}` : ''

  const originURL = `${protocol}//${hostname}${port}`

  WebViewManager.open(originURL + proxyUrl, '_blank')
}
