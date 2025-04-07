import { Box, Typography } from '@mui/material'

import TherapyMeditationBanner from '/public/assets/images/HelloPage/MentalHealth/TherapyMeditationBanner.svg'

import { useRouter } from 'next/router'
import { usePostHog } from 'posthog-js/react'
import { useEffect } from 'react'

import { NEW_ROUTES } from '@/constants/routes'
import { useModalContext } from '@/v3/presentation/components/Modal'
import { useMutateSendEmailMentalHealthCampaing } from '@/v3/presentation/hooks/api/@v2/mental-health/useMutateSendEmailMentalHealthCampaing'
import { usePageTimeCounter } from '@/v3/presentation/hooks/usePageTimeCounter'
import { avoidConsecutiveExecutions } from '@/v3/utils/avoid-consecutive-executions'
import { useBreakpoint } from '@/hooks/useBreakpoints'
import { addShowOfHandsMentalHealth } from '@/v3/domain/@v2/integrations/n8n/show-of-hands-mental-health'
import { useAuth } from '@/v3/presentation/hooks/useAuth'

import { BannerEnum } from '../types/banner.enum'

import { CardContainerBanner } from './CardContainerBanner'
import { ContainerBackgroundGrid } from './ContainerBackgroundGrid'

type TherapyContentBannerProps = {
  isModal?: boolean
}

export const TherapyContentBanner = ({ isModal }: TherapyContentBannerProps) => {
  const posthog = usePostHog()
  const sendEmail = useMutateSendEmailMentalHealthCampaing()
  const { getCount } = usePageTimeCounter()
  const { handleModal } = useModalContext()
  const router = useRouter()
  const isMobile = useBreakpoint('sm')
  const isTablet = useBreakpoint('lg', 'down')
  const { user } = useAuth()

  const onClick = () => {
    const isAppointment = router.pathname.includes(NEW_ROUTES.AUTHENTICATED.APPOINTMENT.path)
    const isUserData = router.pathname.includes(NEW_ROUTES.AUTHENTICATED.USERS.path)

    localStorage.setItem(BannerEnum.THERAPY_CONTENT, 'true')

    if (isAppointment) {
      posthog.capture('clicked_therapy_banner_appointment', {
        time_spent: getCount(),
      })
      addShowOfHandsMentalHealth({
        name: user?.getFullName(),
        email: user?.email,
        roles: user?.roles,
        event: 'clicked_therapy_banner_appointment',
      })

      sendEmail.mutateAsync({
        product: 'therapy',
      })
    }

    if (!isAppointment) {
      if (!isUserData) {
        posthog.capture('clicked_therapy_banner_home', {
          time_spent: getCount(),
        })
        addShowOfHandsMentalHealth({
          name: user?.getFullName(),
          email: user?.email,
          roles: user?.roles,
          event: 'clicked_therapy_banner_home',
        })
      }
      if (isUserData) {
        posthog.capture('clicked_therapy_banner_user', {
          time_spent: getCount(),
        })
        addShowOfHandsMentalHealth({
          name: user?.getFullName(),
          email: user?.email,
          roles: user?.roles,
          event: 'clicked_therapy_banner_user',
        })
      }

      router.push(NEW_ROUTES.AUTHENTICATED.MENTAL_HEALTH.BANNER.THERAPY.path)
    }

    handleModal()
  }

  useEffect(() => {
    avoidConsecutiveExecutions('viewed_therapy_banner', () =>
      posthog.capture('viewed_therapy_banner'),
    )
  }, [posthog])

  const onClose = () => {
    localStorage.setItem(BannerEnum.THERAPY_CONTENT, new Date().toISOString())
  }

  const shortText = isTablet || isMobile || isModal

  return (
    <ContainerBackgroundGrid
      isModal={isModal}
      backgroundColor={'var(--mui-palette-primary-light)'}
      onClick={onClick}
      onClose={onClose}
    >
      <CardContainerBanner
        isModal={isModal}
        color='secondary'
        buttonText='QUERO SABER MAIS'
        text='Conheça nossas sessões de Terapia'
        onActionClick={onClick}
        image={({ height, width }) =>
          isModal ? (
            <TherapyMeditationBanner height={height} width={width} />
          ) : (
            <TherapyMeditationBanner style={{ padding: 10 }} width={'100%'} height={'100%'} />
          )
        }
        title={({ fontSize }) => (
          <Box
            width={isModal ? ['100%', 160] : '100%'}
            minWidth={isModal ? undefined : [, 241, 241, 395]}
          >
            <Typography
              maxWidth={isModal ? ['100%', 200] : 500}
              minWidth={isMobile && !isModal ? 214 : undefined}
              color='white'
              lineHeight={isModal ? '15.6px' : ['16px', '22px', '22px', '28px']}
              fontWeight={800}
              fontSize={isModal ? '16px' : shortText ? '14px' : fontSize}
            >
              {shortText && 'Sua equipe está '}
              {!shortText && 'Sua equipe está se sentindo '}
              <Typography
                component={'span'}
                color='#FEF592'
                lineHeight={isModal ? '15.6px' : ['16px', '22px', '22px', '28px']}
                fontWeight={800}
                fontSize={shortText ? '14px' : fontSize}
              >
                sobrecarregada?
              </Typography>
            </Typography>
            <Typography
              maxWidth={isModal ? ['100%', 200] : 395}
              width={isModal ? '100%' : undefined}
              color='white'
              fontWeight={400}
              mt={isModal ? '4px' : undefined}
              lineHeight={shortText ? '13.2px' : ['13.2px', '15.4px', '15.4px', '17.6px']}
              fontSize={isModal ? '12px' : ['12px', '14px', '14px', '16px']}
              sx={{ opacity: 0.8 }}
            >
              Ofereça sessões de terapia personalizadas para ajudar seus colaboradores a manter o
              foco e a produtividade.
            </Typography>
          </Box>
        )}
      />
    </ContainerBackgroundGrid>
  )
}
