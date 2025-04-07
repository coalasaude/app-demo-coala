import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined'
import StarIcon from '@mui/icons-material/Star'
import OutlinedFlagIcon from '@mui/icons-material/OutlinedFlag'
import { useRouter } from 'next/router'

import { GridItem, GridWrapper } from '@/components/Grid'
import {
  CCardColor,
  CCardColorShortContent,
} from '@/v3/presentation/newComponents/atoms/CCardColor'
import { useFetchReadInstitutionalPeiPdi } from '@/v3/presentation/hooks/api/@v2/mental-health/useFetchReadInstitutionalPeiPdi'
import { useAuth } from '@/v3/presentation/hooks/useAuth'

import GeneralPlanProgressCard from '../../GeneralPlanProgressCard/GeneralPlanProgressCard'
import PeiPdiAnalysisHeaderSkeleton from '../../PeiPdiAnalysisHeaderSkeleton/PeiPdiAnalysisHeaderSkeleton'

const PeiPdiAnalysisHeader = () => {
  const { user } = useAuth()
  const router = useRouter()
  const { data, isLoading } = useFetchReadInstitutionalPeiPdi({
    userId: user?.id || 0,
    institutionId: Number(router.query.id),
  })

  if (isLoading) {
    return <PeiPdiAnalysisHeaderSkeleton />
  }

  return (
    <GridWrapper alignItems='flex-end'>
      <GridItem xs={12} sm={12} md={4}>
        <GeneralPlanProgressCard percentValue={data?.generalPlansProgress || 0} />
      </GridItem>
      <GridItem xs={12} sm={3} md={2}>
        <CCardColor state='info' boxProps={{ padding: 1, borderRadius: 3, width: '100%' }}>
          <CCardColorShortContent
            Icon={
              <ArrowRightOutlinedIcon
                sx={{
                  fill: 'var(--mui-palette-info-main)',
                  fontSize: 30,
                  ml: -1,
                }}
              />
            }
            number={data?.startedPlans || 0}
            title='Planos iniciados'
            titleColor='var(--mui-palette-info-main)'
          />
        </CCardColor>
      </GridItem>
      <GridItem xs={12} sm={3} md={2}>
        <CCardColor state='success' boxProps={{ padding: 1, borderRadius: 3, width: '100%' }}>
          <CCardColorShortContent
            Icon={<StarIcon sx={{ fill: 'var(--mui-palette-success-main)', fontSize: 20 }} />}
            number={data?.completedHalfOrMore || 0}
            title='Alunos com +50% PEI/PDI'
            titleColor='var(--mui-palette-success-main)'
          />
        </CCardColor>
      </GridItem>
      <GridItem xs={12} sm={3} md={2}>
        <CCardColor state='warning' boxProps={{ padding: 1, borderRadius: 3, width: '100%' }}>
          <CCardColorShortContent
            Icon={<OutlinedFlagIcon sx={{ fill: 'var(--mui-palette-warning-main)' }} />}
            number={data?.completedLessThanHalf || 0}
            title='Alunos com -50% PEI/PDI'
            titleColor='var(--mui-palette-warning-main)'
          />
        </CCardColor>
      </GridItem>
      <GridItem xs={12} sm={3} md={2}>
        <CCardColor state='error' boxProps={{ padding: 1, borderRadius: 3, width: '100%' }}>
          <CCardColorShortContent
            Icon={<OutlinedFlagIcon sx={{ fill: 'var(--mui-palette-error-main)' }} />}
            number={data?.pendingPlans || 0}
            title='Planos não iniciados'
            titleColor='var(--mui-palette-error-main)'
          />
        </CCardColor>
      </GridItem>
    </GridWrapper>
  )
}

export default PeiPdiAnalysisHeader
