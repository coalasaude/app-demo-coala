import { useCallback, useRef } from 'react'

import { CStepperRefProps } from '@/v3/presentation/newComponents/layout/CStepper'
import { useUrlQueryControl } from '@/v3/presentation/hooks/useUrlQueryControl'
import { useModalContext } from '@/v3/presentation/components/Modal'
import { useMutateAddTask } from '@/v3/presentation/hooks/api/@v2/mental-health/useMutateAddTask'
import { useMutateAddSubCategory } from '@/v3/presentation/hooks/api/@v2/mental-health/useMutateAddSubCategory'
import { MentalHealthTaskParams } from '@/v3/infra/services/@v2/mental-health/learning/add-task'

export enum CreateTaskPeiPdiSteps {
  IDENTIFICATION = 'IDENTIFICATION',
  ACTIVITIES = 'ACTIVITIES',
}

export function useCreateTaskPeiPdiControl<T extends string>() {
  const { handleModal } = useModalContext()
  const { mutateAsync: mutateAddTask, isPending } = useMutateAddTask()
  const { mutateAsync: mutateSubCategory } = useMutateAddSubCategory()
  const stepperRef = useRef<CStepperRefProps<T>>(null)
  const {
    router,
    queryParam: step,
    replaceQueryParam: setStep,
  } = useUrlQueryControl<T>({
    queryName: 'step',
    startValue: CreateTaskPeiPdiSteps.IDENTIFICATION as T,
  })

  const onGoBack = useCallback(() => {
    if (router.query.step) {
      if (stepperRef.current?.hasPrev()) return setStep(stepperRef.current.getPrevStep())
    }

    handleModal()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setStep])

  const onNextStep = () => {
    if (stepperRef.current?.hasNext()) {
      const nextStep = stepperRef.current?.getNextStep()
      setStep(nextStep)
    }
  }

  const createSubCategory = async (body: MentalHealthTaskParams & { name: string }) => {
    await mutateSubCategory({
      categoryId: body.categoryId,
      patientId: Number(router.query.userId),
      name: body.name,
    }).then(async ({ id: subCategoryId }) => {
      return await mutateAddTask({
        ...body,
        subCategoryId,
        planId: Number(body.planId),
        patientId: Number(router.query.userId),
      }).then(() => handleModal())
    })
  }

  const onEndStep = async (body: MentalHealthTaskParams) => {
    await mutateAddTask({
      ...body,
      subCategoryId: Number(body.subCategoryId),
      categoryId: Number(body.categoryId),
    }).then(() => handleModal())
  }

  return {
    step,
    onEndStep,
    onGoBack,
    onNextStep,
    createSubCategory,
    isLoadingAddTask: isPending,
    stepperRef,
  }
}
