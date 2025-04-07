import MentalHealthBannerBg from '/public/assets/images/HelloPage/MentalHealth/MentalHealthBannerBgCollaborator.png'
import MentalHealthBannerBgMobile from '/public/assets/images/HelloPage/MentalHealth/MentalHealthBannerBgMobileCollaborator.png'
import MentalHealthBannerModal from '/public/assets/images/HelloPage/MentalHealth/MentalHealthBannerModalCollaborator.png'

import { useRouter } from 'next/router'
import { usePostHog } from 'posthog-js/react'
import { useEffect } from 'react'

import { NEW_ROUTES } from '@/constants/routes'
import { useModalContext } from '@/v3/presentation/components/Modal'
import { useMutateSendEmailMentalHealthCampaing } from '@/v3/presentation/hooks/api/@v2/mental-health/useMutateSendEmailMentalHealthCampaing'
import { usePageTimeCounter } from '@/v3/presentation/hooks/usePageTimeCounter'
import { avoidConsecutiveExecutions } from '@/v3/utils/avoid-consecutive-executions'
import useMediaQuery from '@/hooks/useMediaQuery'

import { ContainerBackgroundGrid } from './ContainerBackgroundGrid'
import { MentalHealthCollaboratorBannerBody } from './MentalHealthCollaboratorBannerBody'
import { MentalHealthCollaboratorBannerModalBody } from './MentalHealthCollaboratorBannerModalBody'

import { addShowOfHandsMentalHealth } from '@/v3/domain/@v2/integrations/n8n/show-of-hands-mental-health'
import { useAuth } from '@/v3/presentation/hooks/useAuth'

type MentalHealthBannerProps = {
  isModal?: boolean
}

export const MentalHealthCollaboratorContentBanner = ({ isModal }: MentalHealthBannerProps) => {
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

    localStorage.setItem('mental-health-collaborator-report', new Date().toISOString())

    if (isAppointment) {
      posthog.capture('clicked_therapy_banner_appointment', {
        time_spent: getCount(),
      })
      addShowOfHandsMentalHealth({name: user?.getFullName(), email: user?.email, roles: user?.roles, event: 'clicked_therapy_banner_appointment'})

      await sendEmail.mutateAsync({
        product: 'mental-health',
      })
    }

    if (!isAppointment) {
      if (!isUserData) {
        posthog.capture('clicked_therapy_banner_home', {
          time_spent: getCount(),
        })
        addShowOfHandsMentalHealth({name: user?.getFullName(), email: user?.email, roles: user?.roles, event: 'clicked_therapy_banner_home'})
      }
      if (isUserData) {
        posthog.capture('clicked_therapy_banner_user', {
          time_spent: getCount(),
        })
        addShowOfHandsMentalHealth({name: user?.getFullName(), email: user?.email, roles: user?.roles, event: 'clicked_therapy_banner_user'})
      }
      router.push(NEW_ROUTES.AUTHENTICATED.MENTAL_HEALTH.BANNER.THERAPY_COLLABORATOR.path)
    }

    handleModal()
  }

  useEffect(() => {
    avoidConsecutiveExecutions('viewed_therapy_banner', () =>
      posthog.capture('viewed_therapy_banner'),
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
      {!isModal && <MentalHealthCollaboratorBannerBody onClick={onClick} />}

      {isModal && <MentalHealthCollaboratorBannerModalBody onClick={onClick} />}
    </ContainerBackgroundGrid>
  )
}
