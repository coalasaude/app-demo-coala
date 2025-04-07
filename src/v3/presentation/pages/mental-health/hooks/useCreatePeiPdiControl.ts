import { useCallback, useRef, useState } from 'react'

import { CStepperRefProps } from '@/v3/presentation/newComponents/layout/CStepper'
import { useUrlQueryControl } from '@/v3/presentation/hooks/useUrlQueryControl'
import { useMutateAddPeiPdi } from '@/v3/presentation/hooks/api/@v2/mental-health/useMutateAddPeiPdi'
import { useModalContext } from '@/v3/presentation/components/Modal'
import { AddPeiPdi } from '@/v3/domain/@v2/mental-health/learning/add-pei-pdi.model'
import { PlanAIStatus } from '@/types/planAiStatus.enum'

export enum CreatePeiPdiSteps {
  DEFINITIONS = 'DEFINITIONS',
  GOALS = 'GOALS',
}


export function useCreatePeiPdiControl<T extends string>({
  canCreateAi,
}: {
  canCreateAi: boolean
}) {
  const { mutateAsync: mutateAddPeiPdi } = useMutateAddPeiPdi()
  const { handleModal } = useModalContext()
  const stepperRef = useRef<CStepperRefProps<T>>(null)
  const [isPending, setIsPending] = useState(false)
  const {
    router,
    queryParam: step,
    replaceQueryParam: setStep,
  } = useUrlQueryControl<T>({
    queryName: 'wstep',
    startValue: CreatePeiPdiSteps.DEFINITIONS as T,
  })

  const onGoBack = useCallback(() => {
    if (router.query.wstep) {
      if (stepperRef.current?.hasPrev()) return setStep(stepperRef.current.getPrevStep())
    }

    handleModal()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, setStep])

  const onNextStep = () => {
    if (stepperRef.current?.hasNext()) {
      const nextStep = stepperRef.current?.getNextStep()
      setStep(nextStep)
    }
  }

  const onEndStep = async (body: AddPeiPdi) => {
    const plan = await mutateAddPeiPdi({
      ...body,
      canCreateAi,
    })
    if (!plan?.id) return

    handleModal()
    setIsPending(plan.planAIStatus === PlanAIStatus.PENDING)
  }

  return {
    step,
    onEndStep,
    onGoBack,
    onNextStep,
    stepperRef,
    isPending,
    setIsPending
  }
}
