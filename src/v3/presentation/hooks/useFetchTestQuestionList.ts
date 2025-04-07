import React from 'react'

import { Question } from '@/v3/domain/Question'
import { TQuestion } from '@/v3/domain/api/ApiCourseResponse'
import { getTestQuestions } from '@/v3/infra/services/course'

import { useFetch } from './useFetch'

export const useFetchTestQuestionList = (courseId: number) => {
  const { data: questionData, ...rest } = useFetch({
    queryKey: ['testQuestions'],
    queryFn: () => getTestQuestions(courseId),
    refetchInterval: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  })

  const data: { maximumTime: number; questions: Question[] } = React.useMemo(() => {
    return {
      maximumTime: questionData?.data?.maximumTime || 0,
      questions:
        questionData?.data?.questions?.map((question: TQuestion) => new Question(question)) || [],
    }
  }, [questionData])

  return {
    data,
    ...rest,
  }
}
