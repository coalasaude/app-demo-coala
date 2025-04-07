import { usePostHog } from 'posthog-js/react'
import { useCallback, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { useParams } from '@/hooks/useParams'
import { useMutateUpdateAppointmentComplaint } from '@/v3/presentation/hooks/api/@v2/appointment/appointment/useMutateUpdateAppointmentComplaint'
import { usePageTimeCounter } from '@/v3/presentation/hooks/usePageTimeCounter'
import { useUrlQueryControl } from '@/v3/presentation/hooks/useUrlQueryControl'
import { CStepperRefProps } from '@/v3/presentation/newComponents/layout/CStepper'

export enum ModalSteps {
  INFORMATION = 'INFORMATION',
  PASSWORD = 'PASSWORD',
}
let confirmButtonLabel = 'Próximo'
let cancelButtonLabel = 'Cancelar'

type ModalControlStepsProps = {
  submitPassword?: (certificatePass?: string) => Promise<void>
}

export function useModalControlSteps<T extends string>({ submitPassword }: ModalControlStepsProps) {
  const stepperRef = useRef<CStepperRefProps<T>>(null)
  const { getCount, resetCounting } = usePageTimeCounter()
  const { mutateAsync: updateAppointment } = useMutateUpdateAppointmentComplaint()
  const { getValues, setError } = useFormContext()
  const { setParams } = useParams()
  const [isLoading, setIsLoading] = useState(false)

  const posthog = usePostHog()

  const {
    router,
    queryParam: step,
    replaceQueryParam: setStep,
  } = useUrlQueryControl<T>({
    queryName: 'step',
    startValue: ModalSteps.INFORMATION as T,
  })
  const appointmentId = Number(router.query.id)

  const onGoBack = useCallback(() => {
    if (!router.query.wstep) {
      if (stepperRef.current?.hasPrev()) {
        confirmButtonLabel = 'Próximo'
        cancelButtonLabel = 'Cancelar'
        return setStep(stepperRef.current.getPrevStep())
      }

      return router.back()
    }

    router.back()
  }, [router, setStep])

  const onNextStep = async () => {
    setIsLoading(true)

    try {
      const { complaintId, isAccident } = getValues()

      if (!isAccident) setError('isAccident', { message: 'Campo obrigatório.' })
      if (!complaintId) setError('complaintId', { message: 'Campo obrigatório.' })
      if (!isAccident || !complaintId) return

      if (stepperRef.current?.hasNext()) {
        const response = await updateAppointment({
          appointmentId,
          isAccident,
          complaintId,
        })

        const nextStep = stepperRef.current?.getNextStep()
        setStep(nextStep)
        confirmButtonLabel = 'Adicionar'
        cancelButtonLabel = 'Voltar'

        return response
      }

      return await onEndStep()
    } finally {
      setIsLoading(false)
    }
  }

  const onEndStep = async () => {
    const { certificatePass } = getValues()

    if (!certificatePass) return setError('certificatePass', { message: 'Senha obrigatória' })
    posthog.capture('user_create_mental_health_appointment', {
      time_spent: getCount(),
    })
    setParams({ certificatePass })
    resetCounting()
    await submitPassword?.()
  }

  return {
    step,
    onGoBack,
    onNextStep,
    stepperRef,
    cancelButtonLabel,
    isLoading,
    confirmButtonLabel,
  }
}
