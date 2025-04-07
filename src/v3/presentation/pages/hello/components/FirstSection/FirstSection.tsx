import { Box } from '@mui/material'

import { MentalHealthBanner } from '@/containers/HelloPage/components/MentalHealthBanner'

import { DialogInfoContent } from './components/DialogInfoContent'

export function FirstSectionHome({ institutionId }: { institutionId: number }) {
  return (
    <Box
      sx={{
        '.slick-dots': { bottom: '5px' },
        '.slick-list': { height: '100% !important' },
        '.slick-slider': { height: '100%' },
        '.slick-slide': { height: '100%', '> div': { height: '100%' } },
        '.slick-track': { height: '100%' },
      }}
      display='flex'
      flexDirection={['column', 'row']}
      gap={2}
      flexWrap='wrap'
    >
      <Box width={['100%', '404px']} flex={8}>
        <MentalHealthBanner />
      </Box>
      <Box width={['100%', '310px']} flex={6}>
        <DialogInfoContent institutionId={institutionId} />
      </Box>
    </Box>
  )
}
