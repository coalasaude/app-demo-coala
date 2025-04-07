import MentalHealthBannerBg from '/public/assets/images/HelloPage/MentalHealth/MentalHealthBannerBg.png'
import MentalHealthBannerBgMobile from '/public/assets/images/HelloPage/MentalHealth/MentalHealthBannerBgMobile.png'
import MentalHealthBannerModal from '/public/assets/images/HelloPage/MentalHealth/MentalHealthBannerModal.png'

import { useRouter } from 'next/router'
import { usePostHog } from 'posthog-js/react'
import { useEffect } from 'react'

import { NEW_ROUTES } from '@/constants/routes'
import { useModalContext } from '@/v3/presentation/components/Modal'
import { useMutateSendEmailMentalHealthCampaing } from '@/v3/presentation/hooks/api/@v2/mental-health/useMutateSendEmailMentalHealthCampaing'
import { usePageTimeCounter } from '@/v3/presentation/hooks/usePageTimeCounter'
import { avoidConsecutiveExecutions } from '@/v3/utils/avoid-consecutive-executions'
import useMediaQuery from '@/hooks/useMediaQuery'

import { BannerEnum } from '../types/banner.enum'

import { ContainerBackgroundGrid } from './ContainerBackgroundGrid'
import { MentalHealthManagerBannerBody } from './MentalHealthManagerBannerBody'
import { MentalHealthManagerBannerModalBody } from './MentalHealthManagerBannerModalBody'

import { addShowOfHandsMentalHealth } from '@/v3/domain/@v2/integrations/n8n/show-of-hands-mental-health'
import { useAuth } from '@/v3/presentation/hooks/useAuth'

type MentalHealthBannerProps = {
  isModal?: boolean
}

export const MentalHealthManagerContentBanner = ({ isModal }: MentalHealthBannerProps) => {
  const posthog = usePostHog()
  const { getCount } = usePageTimeCounter()
  const { handleModal } = useModalContext()
  const sendEmail = useMutateSendEmailMentalHealthCampaing()
  const router = useRouter()
  const isMobile = useMediaQuery('sm')
  const { user } = useAuth()

  const onClick = async () => {
    const isAppointment = router.pathname.includes(NEW_ROUTES.AUTHENTICATED.APPOINTMENT.path)
    const isUserData = router.pathname.includes(NEW_ROUTES.AUTHENTICATED.USERS.path)

    localStorage.setItem(BannerEnum.MENTAL_HEALTH_INCOMPLETE_REPORT, new Date().toISOString())

    if (isAppointment) {
      posthog.capture('clicked_mental_health_banner_appointment', {
        time_spent: getCount(),
      })
      addShowOfHandsMentalHealth({
        name: user?.getFullName(),
        email: user?.email,
        roles: user?.roles,
        event: 'clicked_mental_health_banner_appointment',
      })

      await sendEmail.mutateAsync({
        product: 'mental-health',
      })
    }

    if (!isAppointment) {
      if (!isUserData) {
        posthog.capture('clicked_mental_health_banner_home', {
          time_spent: getCount(),
        })
        addShowOfHandsMentalHealth({
          name: user?.getFullName(),
          email: user?.email,
          roles: user?.roles,
          event: 'clicked_mental_health_banner_home',
        })
      }
      if (isUserData) {
        posthog.capture('clicked_mental_health_banner_user', {
          time_spent: getCount(),
        })
        addShowOfHandsMentalHealth({
          name: user?.getFullName(),
          email: user?.email,
          roles: user?.roles,
          event: 'clicked_mental_health_banner_user',
        })
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
    <ContainerBackgroundGrid
      isModal={isModal}
      backgroundColor='transparent'
      bgImage={isMobile ? MentalHealthBannerBgMobile.src : MentalHealthBannerBg.src}
      modalBgImage={MentalHealthBannerModal.src}
      backgroundRepeat='no-repeat'
      backgroundPosition='center'
      backgroundSize='cover'
      width={isModal ? (!isMobile ? 440 : '100vw') : undefined}
      height={isModal ? [250, '300px', '300px'] : [176, '210px', '210px']}
      onClick={onClick}
      cursor='pointer'
    >
      {!isModal && <MentalHealthManagerBannerBody onClick={onClick} />}

      {isModal && <MentalHealthManagerBannerModalBody onClick={onClick} />}
    </ContainerBackgroundGrid>
  )
}
