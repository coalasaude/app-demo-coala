import { useCallback, useRef } from 'react'
import { usePostHog } from 'posthog-js/react'

import { useUrlQueryControl } from '@/v3/presentation/hooks/useUrlQueryControl'
import { CStepperRefProps } from '@/v3/presentation/newComponents/layout/CStepper'
import { usePageTimeCounter } from '@/v3/presentation/hooks/usePageTimeCounter'
import { useMutateAddAppointment } from '@/v3/presentation/hooks/api/@v2/appointment/appointment/useMutateAddAppointment'
import { bindPathParams } from '@/utils/bindParams'
import { NEW_ROUTES } from '@/constants/routes'

import { IFormAddAppointment } from '../../../components/Appointment/FormAppointment/schema/add-schema'

export enum AppointmentSteps {
  INITIAL_DATA = 'INITIAL-DATA',
  DESCRIPTION = 'DESCRIPTION',
  FINAL = 'FINAL',
}

export function useAppointmentControlSteps<T extends string>(timeCount: () => number) {
  const { mutateAsync: addAppointment, errorMessage, isPending } = useMutateAddAppointment()
  const stepperRef = useRef<CStepperRefProps<T>>(null)
  const { resetCounting } = usePageTimeCounter()
  const posthog = usePostHog()

  const {
    router,
    queryParam: step,
    replaceQueryParam: setStep,
  } = useUrlQueryControl<T>({
    queryName: 'step',
    startValue: AppointmentSteps.INITIAL_DATA as T,
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

  const onEndStep = async (body: IFormAddAppointment) => {
    const { file, ...requestData } = body || {}

    addAppointment({
      file,
      institutionId: requestData.institutionId!,
      patientId: requestData.patientId || undefined,
      requesterId: requestData.requestedUserId || undefined,
      resume: requestData.resume,
      enableNotification: requestData.enableNotification,
    }).then((appointment) => {
      posthog.capture('user_created_appointment', {
        time_spent: timeCount(),
        appointment: {
          id: appointment.id,
          resume: requestData.resume,
          patient_id: requestData.patientId,
          requester_id: requestData.requestedUserId,
          file: !!file,
        },
        current_institution_id: requestData.institutionId,
      })
      router.push(
        bindPathParams(NEW_ROUTES.AUTHENTICATED.APPOINTMENT.VIEW.path, {
          id: appointment.id,
        }),
      )
    })

    if (errorMessage) {
      posthog.capture('appointment_creation_error', {
        time_spent: timeCount(),
        appointment: {
          resume: requestData.resume,
          patient_id: requestData.patientId,
          requester_id: requestData.requestedUserId,
          file: !!file,
        },
        current_institution_id: requestData.institutionId,
        errorMessage,
      })
    }
    resetCounting()
  }

  return {
    step,
    onEndStep,
    onGoBack,
    isPending: isPending || step == undefined,
    addAppointment,
    errorMessage,
    onNextStep,
    stepperRef,
  }
}
