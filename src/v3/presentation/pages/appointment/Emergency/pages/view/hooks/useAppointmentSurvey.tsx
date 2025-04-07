import { useCallback } from 'react'

import { SurveyEnum } from '@/v3/domain/@v2/survey/enum/survey.enum'
import { CSurvey } from '@/v3/presentation/components/CSurvey'
import { useModalContext } from '@/v3/presentation/components/Modal'
import { FeatureFlag } from '@/v3/presentation/constants/feature-flag.constants'
import { useFetchBrowseSurveys } from '@/v3/presentation/hooks/api/@v2/survey/useFetchBrowseSurvey'
import { useMutateAddSurveyAnswer } from '@/v3/presentation/hooks/api/@v2/survey/useMutateAddSurveyAnswer'
import { useFeatureFlag } from '@/v3/presentation/hooks/useFeatureFlag'

export const useAppointmentSurvey = (appointmentId: number) => {
  const { handleModal } = useModalContext()
  const { surveys, refetch, isRefetching, isPending } = useFetchBrowseSurveys({ appointmentId })
  const { mutate } = useMutateAddSurveyAnswer()

  const surveyAppointmentCreationFlag = useFeatureFlag({
    flag: FeatureFlag.SURVEY_APPOINTMENT_CREATION_FORM,
  })
  const surveyAppointmentAttendanceFlag = useFeatureFlag({
    flag: FeatureFlag.SURVEY_APPOINTMENT_ATTENDANCE,
  })

  const onOpenAppointmentCreation = useCallback(() => {
    const survey = surveys?.findSurveyByName(SurveyEnum.APPOINTMENT_CREATION_FORM)
    if (survey && surveyAppointmentCreationFlag.isActive) {
      handleModal(
        <CSurvey
          key='survey-appointment-creation-form'
          label='Como foi a experiência de preencher o formulário de chamar ajuda?'
          event={{ name: 'appointment_survey' }}
          lowerBoundLabel='Muito difícil'
          upperBoundLabel='Muito fácil'
          onSubmit={(answer, comment) =>
            mutate({ answer, surveyId: survey.id, appointmentId, comment })
          }
        />,
        { isQuiet: true },
      )
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [surveys, appointmentId])

  const onOpenAppointmentAttendance = useCallback(() => {
    const survey = surveys?.findSurveyByName(SurveyEnum.APPOINTMENT_ATTENDANCE)
    if (survey && surveyAppointmentAttendanceFlag.isActive) {
      handleModal(
        <CSurvey
          key='survey-appointment-attendance'
          label='Como você avalia a sua satisfação com o atendimento prestado?'
          event={{ name: 'appointment_attendace_survey' }}
          lowerBoundLabel='Muito insatisfeito'
          upperBoundLabel='Muito satisfeito'
          onSubmit={(answer, comment) =>
            mutate({ answer, surveyId: survey.id, appointmentId, comment })
          }
        />,
        { isQuiet: true },
      )
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [surveys, appointmentId])

  const onOpenAppointmentSurvey = useCallback(() => {
    onOpenAppointmentCreation()
    onOpenAppointmentAttendance()
  }, [onOpenAppointmentCreation, onOpenAppointmentAttendance])

  return {
    onOpenAppointmentSurvey,
    onOpenAppointmentAttendance,
    refetchSurvey: refetch,
    isPending: isRefetching || isPending,
  }
}
