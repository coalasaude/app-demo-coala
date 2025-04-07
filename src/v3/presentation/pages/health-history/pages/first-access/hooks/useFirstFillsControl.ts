import { usePostHog } from 'posthog-js/react'
import { useCallback, useRef } from 'react'

import {
  FirstFillingStepStatus,
  FirstFillingType,
  UserFirstFills,
} from '@/v3/domain/UserFirstFills'
import { useFetchReadUser } from '@/v3/presentation/hooks/api/@v2/users/users/useFetchReadUser'
import { useMutateUserFirstFilling } from '@/v3/presentation/hooks/api/first-filling/useMutateFirstFilling'
import { usePageTimeCounter } from '@/v3/presentation/hooks/usePageTimeCounter'
import { useUrlQueryControl } from '@/v3/presentation/hooks/useUrlQueryControl'
import { CStepperRefProps } from '@/v3/presentation/newComponents/layout/CStepper'

export function useFirstFillsControlSteps<T extends string>({
  userId,
  startStep,
  onEndFill: onEnd,
  type,
  routerBackPath,
}: {
  userId?: number
  startStep?: T
  onSkipFill?: () => void
  onEndFill?: () => void
  type: FirstFillingType
  routerBackPath?: string
}) {
  const { user } = useFetchReadUser({ userId: userId as unknown as number })
  
  const { firstFillingMutate, isLoadingCreateFirstFills } = useMutateUserFirstFilling({})
  const stepperRef = useRef<CStepperRefProps<T>>(null)
  const { getCount, resetCounting } = usePageTimeCounter()
  const posthog = usePostHog()

  const {
    router,
    queryParam: step,
    replaceQueryParam: setStep,
  } = useUrlQueryControl<T>({
    queryName: 'step',
    startValue: startStep,
  })

  const onGoBack = useCallback(() => {
    if (!router.query.wstep) {
      if (stepperRef.current?.hasPrev()) return setStep(stepperRef.current.getPrevStep())

      if (routerBackPath) return router.replace(routerBackPath)
      return router.back()
    }

    router.back()
  }, [router, routerBackPath, setStep])

  const onCreateFillStep = async (step: T, status: FirstFillingStepStatus) => {
    if (user?.id) {
      await firstFillingMutate({
        step,
        status,
        userId: user.id,
        type,
      })
    }
  }

  const onInitStep = (step: T) => async () => {
    await onCreateFillStep(step, FirstFillingStepStatus.INITIALIZED)
    setStep(step)
  }

  const onEndStep =
    (step: T, options?: { skipCreateFill?: boolean; resetOnChange?: string[] }) => async () => {
      if (!options?.skipCreateFill) await onCreateFillStep(step, FirstFillingStepStatus.ENDED)

      if (stepperRef.current?.hasNext()) {
        const nextStep = stepperRef.current?.getNextStep()
        setStep(nextStep, { resetOnChange: ['wstep'] })
      }

      posthog.capture('user_first_filling_step', {
        step,
        time_spent: getCount(),
      })
      resetCounting()
    }

  const onSkipStep = (step: T) => async () => {
    await onCreateFillStep(step, FirstFillingStepStatus.SKIPPED)

    const nextStep = stepperRef.current?.getNextStep?.()
    if (nextStep != undefined) setStep(nextStep, { resetOnChange: ['wstep'] })
  }

  const onSkipFill = async () => {
    await onSkipStep(UserFirstFills.steps.INITIATE as T)()
    onEnd?.()
  }

  const onEndFill = async () => {
    await onEndStep(UserFirstFills.steps.FINISHED as T)()
    onEnd?.()
  }

  return {
    step,
    onInitStep,
    onEndStep,
    onSkipStep,
    onSkipFill,
    onEndFill,
    onGoBack,
    isLoadingCreateFirstFills: isLoadingCreateFirstFills || step == undefined,
    user,
    firstFillingMutate,
    stepperRef,
  }
}
