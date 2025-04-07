import { useRouter } from 'next/router'
import { useState } from 'react'

import useMediaQuery from '@/hooks/useMediaQuery'
import { useFetchBrowseSurveys } from '@/v3/presentation/hooks/api/@v2/survey/useFetchBrowseSurvey'
import { useMutateAddSurveyAnswer } from '@/v3/presentation/hooks/api/@v2/survey/useMutateAddSurveyAnswer'

import AlreadyFilled from './AlreadyFilled'
import SurveyDesktop from './index.desktop'
import SurveyMobile from './index.mobile'
import { defaultValues } from './types/TSurvey'
import Verify from './Verify'

export const Survey = () => {
  const isSmallDevice = useMediaQuery('sm')
  const router = useRouter()
  const { surveys, isPending } = useFetchBrowseSurveys()
  const { mutateAsync, isPending: addLoading } = useMutateAddSurveyAnswer()
  const [hasAnswered, setHasAnswered] = useState(false)

  const surveyId = Number(router.query.surveyId as string)
  const answerId = Number(router.query.answerId as string)

  const survey = surveys?.data?.find((survey) => survey.id == surveyId)
  const answer = survey?.answers.find((answer) => answer.id == answerId)

  if (hasAnswered) return <Verify />
  if (isPending) return null
  if (!answer) return <AlreadyFilled />

  const onSubmit = async (body: typeof defaultValues) => {
    if (addLoading) return

    mutateAsync({
      answerId: answerId,
      surveyId: surveyId,
      answer: body.grade,
      comment: body.comment || undefined,
    }).finally(() => {
      setHasAnswered(true)
    })
  }

  if (isPending) {
    return null
  }

  if (isSmallDevice) {
    return <SurveyMobile onSubmit={onSubmit} />
  }

  return <SurveyDesktop onSubmit={onSubmit} />
}

export default Survey
