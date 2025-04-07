import { Box } from '@mui/material'
import { usePostHog } from 'posthog-js/react'
import { useEffect } from 'react'

import { PageHeader } from '@/v3/presentation/newComponents'

import { MentalHealthContainerPage } from '../components/MentalHealthContainerPage'

export const MentalHealthBannerPage = () => {
  const posthog = usePostHog()

  useEffect(() => {
    posthog.capture('viewed_mental_health_banner_page')
  }, [posthog])

  return (
    <Box>
      <PageHeader title='Saúde mental' />
      <MentalHealthContainerPage />
    </Box>
  )
}
