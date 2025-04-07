import { usePostHog } from 'posthog-js/react'

import { WebViewManager } from '@/services/WebView'
import { usePageTimeCounter } from '@/v3/presentation/hooks/usePageTimeCounter'

import { MentalHealthContainerPageBody } from './MentalHealthContainerPageBody'

export const MentalHealthContainerPage = () => {
  const { getCount } = usePageTimeCounter()
  const posthog = usePostHog()

  const onClick = () => {
    posthog.capture('clicked_mental_health_page_schedule', {
      time_spent: getCount(),
    })

    WebViewManager.open(
      'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3UTkWGUPSIm95mVF2AeIRREky2JqOQ0aWzV4-lJjetUyDT0gs8rx-DcPLngoSuNKAwcM-zsZKW',
    )
  }

  return (
    <>
      <MentalHealthContainerPageBody onClick={onClick} />
    </>
  )
}
