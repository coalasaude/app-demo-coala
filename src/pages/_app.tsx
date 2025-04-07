import type { AppProps } from 'next/app'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { setLocale } from 'yup'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { HydrationBoundary, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import duration from 'dayjs/plugin/duration'
import isBetween from 'dayjs/plugin/isBetween'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import updateLocale from 'dayjs/plugin/updateLocale'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

import { Template } from '@/components/Template'
import { yupTranslation } from '@/constants/yup-locale'
import Providers from '@/context'
import { ContextByRoute } from '@/context/ContextByRoute'
import useMediaQuery from '@/hooks/useMediaQuery'
import { PermissionProvider } from '@/v3/presentation/contexts/permissions'
import { Modal, ModalProvider } from '@/v3/presentation/components/Modal'
import { NotificationProvider } from '@/v3/presentation/contexts/notifications/NotificationProvider'
import { CJoyride } from '@/v3/presentation/newComponents'
import { JoyrideProvider } from '@/v3/presentation/newComponents/atoms/CJoyride/useJoyrideContext'
import { FeatureFlagProvider } from '@/v3/presentation/contexts/feature-flags/FeatureFlagProvider'

import 'simplebar-react/dist/simplebar.min.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import '../styles/globals.css'
import '../styles/mobile.css'

import '../configs/i18n.config'

setLocale(yupTranslation)

dayjs.extend(updateLocale)
dayjs.extend(isSameOrAfter)
dayjs.extend(isBetween)
dayjs.extend(duration)
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.updateLocale('pt-br', { weekdaysMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'] })

export const queryClient = new QueryClient()

interface MyAppProps extends AppProps {
  pageProps: {
    dehydratedState?: any
  }
}

if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY || '', {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
    person_profiles: 'identified_only',
    loaded: (posthog) => {
      if (process.env.NODE_ENV !== 'production') {
        posthog.debug()
        posthog.opt_out_capturing()
        posthog.set_config({ disable_session_recording: true })
      }
    },
  })
}

function MyApp({ Component, pageProps }: MyAppProps) {
  const isMobile = useMediaQuery('sm')
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const body = document.body

    if (!!body && isMobile) {
      body.className = 'mobile'
    }
  }, [isMobile])

  if (!isMounted) return null

  return (
    <JoyrideProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <HydrationBoundary state={pageProps.dehydratedState}>
          <ModalProvider>
            <Providers isMobile={isMobile}>
              <CJoyride />
              <NotificationProvider>
                <PermissionProvider>
                  <Modal />
                  <Template
                    useLayout={(Component as any)?.useLayout}
                    useContexts={(Component as any)?.useContexts}
                  >
                    <ContextByRoute>
                      <Head>
                        <title>Coala Saúde</title>
                      </Head>
                      <PostHogProvider client={posthog}>
                        <FeatureFlagProvider>
                          <Component {...pageProps} />
                        </FeatureFlagProvider>
                      </PostHogProvider>
                    </ContextByRoute>
                  </Template>
                </PermissionProvider>
              </NotificationProvider>
            </Providers>
          </ModalProvider>
        </HydrationBoundary>
      </QueryClientProvider>
    </JoyrideProvider>
  )
}

export default MyApp
