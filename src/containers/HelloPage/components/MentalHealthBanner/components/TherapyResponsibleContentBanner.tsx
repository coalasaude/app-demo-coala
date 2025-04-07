import { Box, Typography } from '@mui/material'

import TherapyMeditationBanner from '/public/assets/images/HelloPage/MentalHealth/TherapyMeditationBanner.svg'

import { useRouter } from 'next/router'
import { usePostHog } from 'posthog-js/react'
import { useEffect } from 'react'

import { NEW_ROUTES } from '@/constants/routes'
import { useLayout } from '@/hooks/useLayout'
import { useModalContext } from '@/v3/presentation/components/Modal'
import { usePageTimeCounter } from '@/v3/presentation/hooks/usePageTimeCounter'
import { avoidConsecutiveExecutions } from '@/v3/utils/avoid-consecutive-executions'
import { addShowOfHandsMentalHealth } from '@/v3/domain/@v2/integrations/n8n/show-of-hands-mental-health'
import { useAuth } from '@/v3/presentation/hooks/useAuth'

import { BannerEnum } from '../types/banner.enum'

import { CardContainerBanner } from './CardContainerBanner'
import { ContainerBackgroundGrid } from './ContainerBackgroundGrid'

type TherapyContentBannerProps = {
  isModal?: boolean
}

export const TherapyResponsibleContentBanner = ({ isModal }: TherapyContentBannerProps) => {
  const posthog = usePostHog()
  const { getCount } = usePageTimeCounter()
  const { showSnackBar } = useLayout()
  const { handleModal } = useModalContext()
  const router = useRouter()
  const { user } = useAuth()

  const onClick = () => {
    const isAppointment = router.pathname.includes(NEW_ROUTES.AUTHENTICATED.APPOINTMENT.path)
    const isUserData = router.pathname.includes(NEW_ROUTES.AUTHENTICATED.USERS.path)

    localStorage.setItem(BannerEnum.THERAPY_RESPONSIBLE, 'true')

    if (isAppointment) {
      posthog.capture('clicked_therapy_responsible_banner_appointment', {
        time_spent: getCount(),
      })
      addShowOfHandsMentalHealth({
        name: user?.getFullName(),
        email: user?.email,
        roles: user?.roles,
        event: 'clicked_therapy_responsible_banner_appointment',
      })

      showSnackBar({
        type: 'success',
        message: 'Você foi adicionado a lista de espera.',
      })
    }

    if (!isAppointment) {
      if (!isUserData) {
        posthog.capture('clicked_therapy_responsible_banner_home', {
          time_spent: getCount(),
        })
        addShowOfHandsMentalHealth({
          name: user?.getFullName(),
          email: user?.email,
          roles: user?.roles,
          event: 'clicked_therapy_responsible_banner_home',
        })
      }

      if (isUserData) {
        posthog.capture('clicked_therapy_responsible_banner_user', {
          time_spent: getCount(),
        })
        addShowOfHandsMentalHealth({
          name: user?.getFullName(),
          email: user?.email,
          roles: user?.roles,
          event: 'clicked_therapy_responsible_banner_user',
        })
      }

      router.push(NEW_ROUTES.AUTHENTICATED.MENTAL_HEALTH.BANNER.THERAPY.path)
    }

    handleModal()
  }

  useEffect(() => {
    avoidConsecutiveExecutions('viewed_therapy_responsible_banner', () =>
      posthog.capture('viewed_therapy_responsible_banner'),
    )
  }, [posthog])

  return (
    <ContainerBackgroundGrid
      isModal={isModal}
      backgroundColor={'var(--mui-palette-primary-light)'}
      onClick={onClick}
    >
      <CardContainerBanner
        isModal={isModal}
        color='secondary'
        buttonText='Entrar na lista de espera'
        text='Conheça nossas sessões de Terapia'
        onActionClick={onClick}
        image={({ height, width }) =>
          isModal ? (
            <TherapyMeditationBanner height={height} width={width} />
          ) : (
            <TherapyMeditationBanner style={{ padding: 10 }} width={'100%'} height={'100%'} />
          )
        }
        title={() => (
          <Box m={isModal ? 0 : [-1, 0]} minWidth={isModal ? undefined : [, 241, 241, 328]}>
            <Typography
              maxWidth={isModal ? ['100%', 200] : [200, 500]}
              color='white'
              lineHeight={isModal ? '15.6px' : ['16px', '22px', '22px', '22px']}
              fontWeight={800}
              fontSize={isModal ? '16px' : ['16px', '22px']}
            >
              Seu filho está{' '}
              <Typography
                component={'span'}
                color='#FEF592'
                lineHeight={isModal ? '15.6px' : ['16px', '22px', '22px', '22px']}
                fontWeight={800}
                fontSize={isModal ? '16px' : ['16px', '22px']}
              >
                ansioso ou estressado?
              </Typography>
            </Typography>
            <Typography
              maxWidth={isModal ? ['100%', 296] : 395}
              width={isModal ? ['296', '163px'] : undefined}
              mt={isModal ? '4px' : [0, '6px']}
              color='white'
              fontWeight={400}
              lineHeight={isModal ? '13.2px' : ['13.2px', '15.4px', '15.4px']}
              fontSize={isModal ? '12px' : ['12px', '14px']}
              sx={{ opacity: 0.9 }}
            >
              Nossas sessões de terapia oferecem o suporte emocional que ele precisa para superar os
              desafios e desenvolver habilidades emocionais para a vida.
            </Typography>
          </Box>
        )}
      />
    </ContainerBackgroundGrid>
  )
}
