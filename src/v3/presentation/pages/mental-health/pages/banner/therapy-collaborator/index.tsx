import { Box } from '@mui/material'
import { usePostHog } from 'posthog-js/react'
import { useEffect } from 'react'

import { PageHeader } from '@/v3/presentation/newComponents'

import { MentalHealthCollaboratorContainerPage } from '../components/MentalHealthCollaboratorContainerPage'

export const TherapyCollaboratorBannerPage = () => {
  const posthog = usePostHog()

  useEffect(() => {
    posthog.capture('viewed_therapy_banner_page')
  }, [posthog])

  return (
    <Box>
      <PageHeader title='Saúde mental' />
      <MentalHealthCollaboratorContainerPage />
    </Box>
  )
}
