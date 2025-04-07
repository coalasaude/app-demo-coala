import { useRouter } from 'next/router'
import React, { createContext, useEffect, useState } from 'react'

import { AUTHENTICATED_ROUTES } from '@/constants/routes'

export const MetaPixelContext = createContext<any>({})
export const MetaPixelProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const [pixel, setPixel] = useState<any>()

  useEffect(() => {
    if (router.pathname.endsWith(AUTHENTICATED_ROUTES.PAYMENT) && !pixel) {
      import('react-facebook-pixel')
        .then((x) => x.default)
        .then((ReactPixel) => {
          ReactPixel.init(process.env.FACEBOOK_PIXEL_ID || '')
          ReactPixel.pageView()
          setPixel(ReactPixel)
          router.events.on('routeChangeComplete', () => {
            ReactPixel.pageView()
          })
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.events, router.pathname, setPixel])

  return <MetaPixelContext.Provider value={{ pixel }}>{children}</MetaPixelContext.Provider>
}
