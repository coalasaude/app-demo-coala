import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { NEW_ROUTES } from '@/constants/routes'
import { bindPathParams } from '@/utils/bindParams'
import { UserModel } from '@/v3/domain/@v2/users/users.model'
import { FirstFillingStepStatus, FirstFillingType } from '@/v3/domain/UserFirstFills'
import { HealthHistorySteps, UserHealthHistoricFills } from '@/v3/domain/UserHealthHistoricFills'
import CTabs from '@/v3/presentation/components/TabsContainer'
import { useFetchHealthHistoryFirsFilling } from '@/v3/presentation/hooks/api/first-filling/useFetchHealthHistoryFirsFilling'
import { useMutateUserFirstFilling } from '@/v3/presentation/hooks/api/first-filling/useMutateFirstFilling'
import { useAuth } from '@/v3/presentation/hooks/useAuth'
import Paper from '@/v3/presentation/components/Paper'

import { TabAllergy } from '../../../health-history/components/TabAllergy'
import { TabDisease } from '../../../health-history/components/TabDisease'
import { TabMedicine } from '../../../health-history/components/TabMedicine'
import TabSickNote from '../../../health-history/components/TabSickNote'
import TabVaccine from '../../../health-history/components/TabVaccine'
import { IntroBody } from '../../../health-history/pages/first-access/components/IntroStep/IntroBody'

export const SectionHealthHistory = ({ user }: { user: UserModel }) => {
  const router = useRouter()
  const { user: authUser } = useAuth()
  const userId = user.id

  const { firstFillingMutate, isLoadingCreateFirstFills } = useMutateUserFirstFilling({})
  const { data, isLoadingFirstFills } = useFetchHealthHistoryFirsFilling({
    userId: userId,
  })

  const actualStep = data?.actualStep
  const isPendingStepFirstFills = UserHealthHistoricFills.getIsPendingStep(actualStep)
  const isPendingToStartFirstFills = UserHealthHistoricFills.getIsPendingToStart(actualStep)
  const isResponsible = !!user.findResponsible(authUser?.id)
  const isSameUser = authUser?.id === userId
  const isSameOrResponsible = isSameUser || isResponsible
  const isLoading = isLoadingFirstFills || (isPendingStepFirstFills && isSameOrResponsible)

  const onInitFilling = async () => {
    if (user?.id) {
      await firstFillingMutate({
        step: HealthHistorySteps.INITIATE,
        status: FirstFillingStepStatus.INITIALIZED,
        userId: user.id,
        type: FirstFillingType.HEALTH_HISTORY,
      })
    }
  }

  useEffect(() => {
    if (isPendingStepFirstFills && isSameOrResponsible) {
      router.replace(
        bindPathParams(NEW_ROUTES.AUTHENTICATED.USERS.HEALTH_HISTORIC.FIRST_FILLS.path, {
          userId,
        }),
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser?.id, isPendingStepFirstFills, router, user, userId])

  if (isPendingToStartFirstFills && !isPendingStepFirstFills && isSameOrResponsible) {
    return (
      <IntroBody isLoading={isLoadingCreateFirstFills} student={user} onConfirm={onInitFilling} />
    )
  }

  return (
    <Paper noBorder>
      <CTabs
        tabsNames={['Alergias', 'Doenças', 'Medicamentos', 'Vacinas', 'Atestados']}
        key={1}
        isLoading={isLoading}
        tabsBody={[
          <TabAllergy userId={userId} key={0} />,
          <TabDisease userId={userId} key={1} />,
          <TabMedicine userId={userId} key={2} />,
          <TabVaccine userId={userId} key={3} />,
          <TabSickNote userId={userId} key={4} />,
        ]}
      />
    </Paper>
  )
}
