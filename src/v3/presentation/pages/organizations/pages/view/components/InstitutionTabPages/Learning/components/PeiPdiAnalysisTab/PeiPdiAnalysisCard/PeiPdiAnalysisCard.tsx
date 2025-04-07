import { Box, Typography } from '@mui/material'
import { useRouter } from 'next/router'

import { BrowseInstitutionalPlan } from '@/v3/domain/@v2/mental-health/learning/browse-institutional-plans.model'
import { CAvatar, CCardBase, CProgressBar } from '@/v3/presentation/newComponents'
import { bindPathParams } from '@/utils/bindParams'
import { NEW_ROUTES } from '@/constants/routes'

interface PeiPdiAnalysisCardProps {
  plan: BrowseInstitutionalPlan
}

const PeiPdiAnalysisCard = ({ plan }: PeiPdiAnalysisCardProps) => {
  const router = useRouter()
  const onClickCard = () => {
    router.push(
      bindPathParams(NEW_ROUTES.AUTHENTICATED.USERS.VIEW.bindPath + '/learning', {
        userId: plan.patient.id,
      }),
    )
  }

  return (
    <CCardBase mb={2} p={2} onClick={onClickCard} sx={{ cursor: 'pointer' }}>
      <Box display='flex' alignItems='center' gap={1}>
        <CAvatar type='initials' name={plan.patient.name} size='large' imageUrl={plan.imageUrl} />
        <Box
          display='flex'
          flexDirection={['column', 'row']}
          justifyContent='space-between'
          width='100%'
        >
          <Box display='flex' flexDirection='column'>
            <Typography variant='h4'>{plan.patient.name}</Typography>
            <Box display='flex' gap={1} alignItems='center'>
              <Typography variant='h6' color='var(--mui-palette-grey-400)'>
                Colobrador Responsável:
              </Typography>
              <Typography variant='h6' color='var(--mui-palette-grey-500)' fontWeight='bold'>
                {plan.responsibleCollaborator}
              </Typography>
            </Box>
          </Box>
          <Box display='flex' alignItems='center' gap={1} width={['100%', '30%']}>
            <CProgressBar state='default' value={plan.taskProgressPercent || 0} />
            <Typography variant='h5' color='var(--mui-palette-primary-main)'>
              {plan.taskProgressPercent || 0}%
            </Typography>
          </Box>
        </Box>
      </Box>
    </CCardBase>
  )
}

export default PeiPdiAnalysisCard
