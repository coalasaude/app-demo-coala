import { Box, Typography } from '@mui/material'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import { useEffect, useMemo } from 'react'
import { usePostHog } from 'posthog-js/react'

import { UserModel } from '@/v3/domain/@v2/users/users.model'
import { Permissions } from '@/constants/permissions'
import { TabsContainerWrapper } from '@/v3/presentation/components/TabsContainer'
import TabsContainerHeader from '@/v3/presentation/components/TabsContainerHeader'
import { useHasPermission } from '@/hooks/useHasPermission'
import { ModalCard, useModalContext } from '@/v3/presentation/components/Modal'
import { useFetchBrowsePeiPdi } from '@/v3/presentation/hooks/api/@v2/mental-health/useFetchBrowsePeiPdi'
import useMediaQuery from '@/hooks/useMediaQuery'
import { DefaultStatus } from '@/types/status'
import { ViewSkeleton } from '@/components/Skeletons/ViewSkeleton'
import { usePageTimeCounter } from '@/v3/presentation/hooks/usePageTimeCounter'
import {
  POSTHOG_ACTIONS,
  POSTHOG_EVENTS,
  buildPath,
} from '@/v3/presentation/constants/posthog-events.constants'
import { useFeatureFlag } from '@/v3/presentation/hooks/useFeatureFlag'
import { FeatureFlag } from '@/v3/presentation/constants/feature-flag.constants'
import { CProgressBar } from '@/v3/presentation/newComponents'
import { useFetchReadUserPlansProgress } from '@/v3/presentation/hooks/api/@v2/mental-health/useFetchReadPlansProgress'
import { PlanAIStatus } from '@/types/planAiStatus.enum'

import { useCreatePeiPdiControl } from '../../hooks/useCreatePeiPdiControl'

import EmptyPeiPdi from './EmptyPdi/EmptyPeiPdi'
import PeiPdiForm from './PeiPdiForm/PeiPdiForm'
import ListPeiPdiItem from './ListPeiPdi/ListPeiPdiItem'
import MotionWaitingTaskAi from './MotionWaitingTaskAi'

interface TabPeiPdiProps {
  user: UserModel
}

const sxMobile = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: '#fff',
  zIndex: 10,
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 0,
}

const sxDesktop = { width: 800 }

const TabPeiPdi = ({ user }: TabPeiPdiProps) => {
  const aiCreation = useFeatureFlag({
    flag: FeatureFlag.MENTAL_HEALTH_PEI_PDI_AI_CREATION,
  })

  const [canMenagePeiPdi] = useHasPermission([Permissions.MANAGE_MENTAL_HEALTH_PLAN])
  const { handleModal } = useModalContext()
  const { peiPdi, isLoading } = useFetchBrowsePeiPdi({ userId: user.id })
  const { totalPlansProgress } = useFetchReadUserPlansProgress({ userId: user.id })
  const { isPending, setIsPending } = useCreatePeiPdiControl({ canCreateAi: aiCreation.isActive })
  const isMobile = useMediaQuery('sm')
  const posthog = usePostHog()
  const { getCount } = usePageTimeCounter()

  const onClickButton = () => {
    posthog.capture(buildPath(POSTHOG_EVENTS.LEARNING.PEI_PDI, POSTHOG_ACTIONS.CLICKED), {
      time_on_page: getCount(),
    })

    handleModal(
      <ModalCard sx={isMobile ? sxMobile : sxDesktop}>
        <PeiPdiForm user={user} canCreateAi={aiCreation.isActive} />
      </ModalCard>,
    )
  }

  const activePlans = useMemo(() => {
    return peiPdi?.filter((plan) => plan.status === DefaultStatus.ACTIVE)
  }, [peiPdi])

  const inactivePlans = useMemo(() => {
    return peiPdi?.filter((plan) => plan.status === DefaultStatus.INACTIVE)
  }, [peiPdi])

  const hasCompletedPlans = useMemo(() => {
    return peiPdi?.some((plan) => {
      return plan.planAIStatus !== PlanAIStatus.PENDING && plan.status === DefaultStatus.ACTIVE
    })
  }, [peiPdi])

  useEffect(() => {
    const hasSomePending = peiPdi?.some((plan) => {
      return plan.planAIStatus === PlanAIStatus.PENDING
    })
    setIsPending(hasSomePending)
  },[peiPdi, setIsPending])

  if (isLoading) {
    return <ViewSkeleton />
  }

  return (
    <TabsContainerWrapper>
      <TabsContainerHeader
        label={
          <Box display='flex' alignItems='center' gap={1} width={['100%', '45%']}>
            <Typography variant='h4'>PEI/PDI</Typography>
            <Box display='flex' alignItems='center' gap={1} width='100%' mr={1}>
              <CProgressBar state='default' value={Number(totalPlansProgress)} />
              <Typography variant='h4' color='var(--mui-palette-primary-main)'>
                {totalPlansProgress}%
              </Typography>
            </Box>
          </Box>
        }
        buttonLabel={aiCreation.isActive ? 'Criar plano com IA' : 'Criar plano'}
        buttonIcon={aiCreation.isActive ? AutoAwesomeIcon : undefined}
        onClick={onClickButton}
        buttonProps={{ disabled: !canMenagePeiPdi }}
      />

      {!!isPending || (!hasCompletedPlans && !!activePlans?.length) ? (
        <MotionWaitingTaskAi />
      ) : (
        <>
          {activePlans?.map((plan, index) => (
            <Box key={index} mb={2}>
              <ListPeiPdiItem canCreateAi={aiCreation.isActive} peiPdi={plan} />
            </Box>
          ))}

          {!activePlans?.length && !inactivePlans?.length && (
            <EmptyPeiPdi
              canCreateWithAi={aiCreation.isActive}
              onClick={canMenagePeiPdi ? onClickButton : undefined}
            />
          )}
        </>
      )}

      {inactivePlans && inactivePlans.length > 0 && (
        <>
          <Typography variant='h4' mb={2} mt={4}>
            Planos encerrados
          </Typography>
          {inactivePlans.map((plan, index) => (
            <Box key={index} mb={2}>
              <ListPeiPdiItem peiPdi={plan} canCreateAi={aiCreation.isActive} />
            </Box>
          ))}
        </>
      )}
    </TabsContainerWrapper>
  )
}

export default TabPeiPdi
