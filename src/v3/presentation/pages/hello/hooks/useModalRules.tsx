import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { usePostHog } from 'posthog-js/react'

import GuideTourBannerFinished from '@/containers/HelloPage/components/GuideTourBanner/Steps/FinishedStep'
import GuideTourBanner from '@/containers/HelloPage/components/GuideTourBanner/Steps/FirstStep'
import { validateUserAndOpenModal } from '@/containers/HelloPage/utils/validateUserAndOpenModal'
import { useModalContext } from '@/v3/presentation/components/Modal'
import { FeatureFlag } from '@/v3/presentation/constants/feature-flag.constants'
import { useFeatureFlag } from '@/v3/presentation/hooks/useFeatureFlag'
import { NPSModalBanner } from '@/containers/HelloPage/components/NPSModalBanner'
import { useJoyrideContext } from '@/v3/presentation/newComponents/atoms/CJoyride/useJoyrideContext'
import { usePageTimeCounter } from '@/v3/presentation/hooks/usePageTimeCounter'

export const useModalRules = () => {
  const posthog = usePostHog()
  const { getCount } = usePageTimeCounter()
  const { handleModal } = useModalContext()
  const router = useRouter()
  const { state, setState } = useJoyrideContext()
  const guideTourResponsible = useFeatureFlag({
    flag: FeatureFlag.GUIDE_TOUR_RESPONSIBLE,
  })
  const guideTourCollaborator = useFeatureFlag({
    flag: FeatureFlag.GUIDE_TOUR_COLLABORATOR,
  })
  const guideTourManager = useFeatureFlag({
    flag: FeatureFlag.GUIDE_TOUR_MANAGER,
  })
  const bannerNPS = useFeatureFlag({
    flag: FeatureFlag.BANNER_NPS,
  }).isActive
  const modalDisplayCount = parseInt(localStorage.getItem('modalDisplayCount') || '0')
  const modalNPSBannerCount = parseInt(localStorage.getItem('modalNPSBannerCount') || '0')

  const handleOpenGuideTourModal = (guideTourType: string) => {
    handleModal(<GuideTourBanner guideTourType={guideTourType} />)

    localStorage.setItem('modalDisplayCount', (modalDisplayCount + 1).toString())
  }

  const captureEvent = () => {
    posthog.capture('guide_tour', {
      guide_tour_state: state,
      type: state.guideTourType,
      status: 'finished',
      time_spent: getCount(),
    })
  }

  useEffect(() => {
    const validateOpenModal = () =>
      validateUserAndOpenModal({
        guideTourCollaborator,
        guideTourManager,
        guideTourResponsible,
        guideTourHealthUnit: { isActive: false },
        handleOpenGuideTourModal,
      })

    validateOpenModal()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const isModalFinishedDisplay = router.query.modalFinished === 'true'
    if (isModalFinishedDisplay) {
      handleModal(<GuideTourBannerFinished />)
      setState({ run: false })
      captureEvent()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query])

  useEffect(() => {
    const isGuideTourModalOpen = state.run === true
    const npsModalDisplay =
      modalDisplayCount >= 1 && !!bannerNPS && modalNPSBannerCount < 1 && !isGuideTourModalOpen

    if (npsModalDisplay) {
      handleModal(<NPSModalBanner />)
      localStorage.setItem('modalNPSBannerCount', (modalNPSBannerCount + 1).toString())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export default useModalRules
