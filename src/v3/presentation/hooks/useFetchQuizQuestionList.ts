import React from 'react'

import { Question } from '@/v3/domain/Question'
import { TQuestion } from '@/v3/domain/api/ApiCourseResponse'
import { getQuizQuestions } from '@/v3/infra/services/course'

import { useFetch } from './useFetch'

export const useFetchQuizQuestionList = (moduleId: number) => {
  const { data: questionData, ...rest } = useFetch({
    queryKey: ['quizQuestions', moduleId],
    queryFn: () => getQuizQuestions(moduleId),
    refetchInterval: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  })

  const data: Question[] = React.useMemo(
    () => questionData?.data?.questions?.map((question: TQuestion) => new Question(question)) || [],
    [questionData]
  )

  return {
    data,
    ...rest,
  }
}
