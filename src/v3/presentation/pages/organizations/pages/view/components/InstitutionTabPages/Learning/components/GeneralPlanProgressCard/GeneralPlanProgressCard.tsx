import { Box, Typography } from '@mui/material'

import { CProgressBar } from '@/v3/presentation/newComponents'

interface GeneralPlanProgressCardProps {
  percentValue: number
}

const GeneralPlanProgressCard = ({ percentValue }: GeneralPlanProgressCardProps) => {
  return (
    <Box bgcolor={'var(--mui-palette-grey-100)'} p={2} borderRadius={3}>
      <Box display='flex' alignItems='center' gap={1} width={'100%'}>
        <CProgressBar state='default' value={percentValue} />
        <Typography variant='h4' color='var(--mui-palette-primary-main)'>
          {percentValue}%
        </Typography>
      </Box>
      <Typography variant='body2' color='var(--mui-palette-grey-500)' mt={1}>
        Andamento geral da instituição
      </Typography>
    </Box>
  )
}

export default GeneralPlanProgressCard
