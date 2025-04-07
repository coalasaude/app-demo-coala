import { Box } from '@mui/material'
import { usePostHog } from 'posthog-js/react'
import { useEffect } from 'react'

import { PageHeader } from '@/v3/presentation/newComponents'

import OccupationalHealthSchool from './OccupationalHealthSchool'

export const OccupationalHealth = () => {
  const posthog = usePostHog()

  useEffect(() => {
    posthog.capture('viewed_occupational_health_banner_page')
  }, [posthog])

  return (
    <Box p={2}>
      <PageHeader title='Saúde ocupacional' />
      <OccupationalHealthSchool />
    </Box>
  )
}

export default OccupationalHealth
