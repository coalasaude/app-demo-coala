import { Typography } from '@mui/material'

import TherapyMeditationBanner from '/public/assets/images/HelloPage/MentalHealth/TherapyMeditationBanner.svg'

import { usePostHog } from 'posthog-js/react'

import { WebViewManager } from '@/services/WebView'
import { usePageTimeCounter } from '@/v3/presentation/hooks/usePageTimeCounter'

import { CardContainerBanner } from './CardContainerBanner'
import { ContainerBackgroundGrid } from './ContainerBackgroundGrid'

export const TherapyContainerBanner = () => {
  const { getCount } = usePageTimeCounter()
  const posthog = usePostHog()

  const onClick = () => {
    posthog.capture('clicked_therapy_banner_schedule', {
      time_spent: getCount(),
    })

    WebViewManager.open(
      'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3UTkWGUPSIm95mVF2AeIRREky2JqOQ0aWzV4-lJjetUyDT0gs8rx-DcPLngoSuNKAwcM-zsZKW',
    )
  }

  return (
    <ContainerBackgroundGrid mt={2} backgroundColor={'var(--mui-palette-primary-light)'}>
      <CardContainerBanner
        color='secondary'
        buttonText='Agendar meu horário'
        onActionClick={onClick}
        image={({ width }) => <TherapyMeditationBanner width={width} height={'100%'} />}
        title={(props) => (
          <Typography maxWidth={['100%', '100%', 389]} {...props}>
            Agende um horário com a nossa equipe e saiba mais como podemos ajudar a sua escola.
          </Typography>
        )}
      />
    </ContainerBackgroundGrid>
  )
}
