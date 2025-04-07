import { Box } from '@mui/material'
import { usePostHog } from 'posthog-js/react'
import { useEffect } from 'react'

import { useTherapyBanner } from '@/v3/presentation/pages/mental-health/pages/banner/hooks'
import { PageHeader } from '@/v3/presentation/newComponents'

import { TherapyContainerBanner } from '../components/TherapyContainerBanner'
import { TherapyResponsibleContainerBanner } from '../components/TherapyResponsibleContainerBanner'

export const TherapyBannerPage = () => {
  const posthog = usePostHog()
  const { isResponsible, isSchoolProfile } = useTherapyBanner()

  useEffect(() => {
    posthog.capture('viewed_therapy_banner_page')
  }, [posthog])

  return (
    <Box>
      <PageHeader title='Saúde mental' />
      {isSchoolProfile && <TherapyContainerBanner />}
      {!isSchoolProfile && isResponsible && <TherapyResponsibleContainerBanner />}
    </Box>
  )
}
