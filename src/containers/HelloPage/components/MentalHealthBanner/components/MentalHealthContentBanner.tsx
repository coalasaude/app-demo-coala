import { Typography } from '@mui/material'

import MentalHealthBannerCoala from '/public/assets/images/HelloPage/MentalHealth/MentalHealthBannerCoala.svg'

import { useRouter } from 'next/router'
import { usePostHog } from 'posthog-js/react'
import { useEffect } from 'react'

import { NEW_ROUTES } from '@/constants/routes'
import { useModalContext } from '@/v3/presentation/components/Modal'
import { useMutateSendEmailMentalHealthCampaing } from '@/v3/presentation/hooks/api/@v2/mental-health/useMutateSendEmailMentalHealthCampaing'
import { usePageTimeCounter } from '@/v3/presentation/hooks/usePageTimeCounter'
import { avoidConsecutiveExecutions } from '@/v3/utils/avoid-consecutive-executions'
import { addShowOfHandsMentalHealth } from '@/v3/domain/@v2/integrations/n8n/show-of-hands-mental-health'
import { useAuth } from '@/v3/presentation/hooks/useAuth'

import { CardContainerBanner } from './CardContainerBanner'
import { ContainerBackgroundGrid } from './ContainerBackgroundGrid'

type MentalHealthBannerProps = {
  isModal?: boolean
}

export const MentalHealthContentBanner = ({ isModal }: MentalHealthBannerProps) => {
  const posthog = usePostHog()
  const sendEmail = useMutateSendEmailMentalHealthCampaing()
  const { handleModal } = useModalContext()
  const { getCount } = usePageTimeCounter()
  const { user } = useAuth()
  const router = useRouter()

  const onClick = async () => {
    const isAppointment = router.pathname.includes(NEW_ROUTES.AUTHENTICATED.APPOINTMENT.path)
    const isUserData = router.pathname.includes(NEW_ROUTES.AUTHENTICATED.USERS.path)

    localStorage.setItem('mental-health-banner', new Date().toISOString())

    if (isAppointment) {
      posthog.capture('clicked_mental_health_banner_appointment', {
        time_spent: getCount(),
      })
      addShowOfHandsMentalHealth({name: user?.getFullName(), email: user?.email, roles: user?.roles, event: 'clicked_mental_health_banner_appointment'})
      await sendEmail.mutateAsync({
        product: 'mental-health',
      })
    }

    if (!isAppointment) {
      if (!isUserData){
        posthog.capture('clicked_mental_health_banner_home', {
          time_spent: getCount(),
        })
        addShowOfHandsMentalHealth({name: user?.getFullName(), email: user?.email, roles: user?.roles, event: 'clicked_mental_health_banner_home'})
      }
      if (isUserData) {
        posthog.capture('clicked_mental_health_banner_user', {
          time_spent: getCount(),
        })
        addShowOfHandsMentalHealth({name: user?.getFullName(), email: user?.email, roles: user?.roles, event: 'clicked_mental_health_banner_user'})
      }

      router.push(NEW_ROUTES.AUTHENTICATED.MENTAL_HEALTH.BANNER.SCHEDULE.path)
    }

    handleModal()
  }

  useEffect(() => {
    avoidConsecutiveExecutions('viewed_mental_health_banner', () =>
      posthog.capture('viewed_mental_health_banner'),
    )
  }, [posthog])

  return (
    <ContainerBackgroundGrid isModal={isModal}>
      <CardContainerBanner
        isModal={isModal}
        color='primary'
        buttonText='QUERO SABER MAIS'
        text='Conheça nosso produto de Saúde Mental'
        onActionClick={onClick}
        image={({ width, height }) => <MentalHealthBannerCoala width={width} height={height} />}
        title={({ fontSize }) => (
          <Typography
            maxWidth={isModal ? ['100%', 153] : 389}
            color='white'
            fontWeight={800}
            fontSize={fontSize}
          >
            Alunos em{' '}
            <Typography component={'span'} color='#FEF592' fontWeight={800} fontSize={fontSize}>
              crise emocional
            </Typography>{' '}
            estão afetando o ambiente da sala?
          </Typography>
        )}
      />
    </ContainerBackgroundGrid>
  )
}
