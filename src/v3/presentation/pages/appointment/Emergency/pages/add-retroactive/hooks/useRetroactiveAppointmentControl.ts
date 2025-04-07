import { useCallback, useRef } from 'react'

import { useUrlQueryControl } from '@/v3/presentation/hooks/useUrlQueryControl'
import { CStepperRefProps } from '@/v3/presentation/newComponents/layout/CStepper'
import { bindPathParams } from '@/utils/bindParams'
import { NEW_ROUTES } from '@/constants/routes'
import { useMutateAddRetroactiveAppointment } from '@/v3/presentation/hooks/api/@v2/appointment/appointment/useMutateAddRetroactiveAppointment'

import { IFormAddRetroactiveAppointment } from '../../../components/Appointment/FormRetroactiveAppointment/schema/add-retroactive-schema'

export enum RetroactiveAppointmentSteps {
  INITIAL_DATA = 'INITIAL-DATA',
  DESCRIPTION = 'DESCRIPTION',
}

export function useRetroactiveAppointmentControlSteps<T extends string>() {
  const {
    mutateAsync: addRetroactiveAppointment,
    errorMessage,
    isPending,
  } = useMutateAddRetroactiveAppointment()
  const stepperRef = useRef<CStepperRefProps<T>>(null)

  const {
    router,
    queryParam: step,
    replaceQueryParam: setStep,
  } = useUrlQueryControl<T>({
    queryName: 'step',
    startValue: RetroactiveAppointmentSteps.INITIAL_DATA as T,
  })

  const onGoBack = useCallback(() => {
    if (!router.query.wstep) {
      if (stepperRef.current?.hasPrev()) return setStep(stepperRef.current.getPrevStep())

      return router.back()
    }

    router.back()
  }, [router, setStep])

  const onNextStep = () => {
    if (stepperRef.current?.hasNext()) {
      const nextStep = stepperRef.current?.getNextStep()
      setStep(nextStep)
    }
  }

  const onEndStep = async (body: IFormAddRetroactiveAppointment) => {
    const { file, ...requestData } = body || {}

    addRetroactiveAppointment({
      file,
      institutionId: requestData.institutionId!,
      patientId: requestData.patientId!,
      requesterId: requestData.requestedUserId!,
      resume: requestData.resume,
      closedAtTime: requestData.closedAtTime,
      createdAtDate: requestData.createdAtDate,
      createdAtTime: requestData.createdAtTime,
      finishedReason: requestData.finishedReason,
      openedAtDate: requestData.openedAtDate,
      openedAtTime: requestData.openedAtTime,
      professionalId: requestData.professionalId,
    }).then((appointment) => {
      router.push(
        bindPathParams(NEW_ROUTES.AUTHENTICATED.APPOINTMENT.VIEW.path, {
          id: appointment?.id,
        }),
      )
    })
  }

  return {
    step,
    onEndStep,
    onGoBack,
    isPending: isPending || step == undefined,
    addAppointment: addRetroactiveAppointment,
    errorMessage,
    onNextStep,
    stepperRef,
  }
}
