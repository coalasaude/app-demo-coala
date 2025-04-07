import {
  TApiCourseRegister,
  TClass,
  TCourseResponse,
  TModule,
  TQuestion,
} from '@/v3/domain/api/ApiCourseResponse'
import { CreateCoursePayload } from '@/v3/presentation/hooks/useMutateCourse'

import { apiInstance } from './api'

export interface CourseApiFilter {
  title?: string
}

export const listCourse = (filter?: CourseApiFilter) =>
  apiInstance.get<{ count: number; results: TCourseResponse[] }>(
    `${process.env.NEXT_PUBLIC_BASE_URL_API}education/course`,
    {
      params: {
        limit: 1000,
        ...filter,
      },
    }
  )

export const listMyCourse = (filter?: CourseApiFilter) =>
  apiInstance.get<{ count: number; results: TCourseResponse[] }>(
    `${process.env.NEXT_PUBLIC_BASE_URL_API}education/course/my-courses`,
    {
      params: {
        limit: 1000,
        ...filter,
      },
    }
  )

export const getCourse = (id: number) =>
  apiInstance.get<TCourseResponse>(`${process.env.NEXT_PUBLIC_BASE_URL_API}education/course/${id}`)

export const deleteCourse = (id: number) =>
  apiInstance.delete<TCourseResponse>(
    `${process.env.NEXT_PUBLIC_BASE_URL_API}education/course/${id}`
  )

export const registerInCourse = (payload: TApiCourseRegister) =>
  apiInstance.post<boolean>(
    `${process.env.NEXT_PUBLIC_BASE_URL_API}education/course/register`,
    payload
  )

export const moduleList = (id: number) =>
  apiInstance.get<TModule>(`${process.env.NEXT_PUBLIC_BASE_URL_API}education/module?courseId=${id}`)

export const getClass = (id: number) =>
  apiInstance.get<TClass>(`${process.env.NEXT_PUBLIC_BASE_URL_API}education/class/${id}`)

export const registerStudentAttendance = (classId: number) =>
  apiInstance.put<boolean>(`${process.env.NEXT_PUBLIC_BASE_URL_API}education/class/${classId}/user`)

export const getQuizQuestions = (moduleId: number) =>
  apiInstance.get<{ maximumTime: number; questions: TQuestion[] }>(
    `${process.env.NEXT_PUBLIC_BASE_URL_API}education/question?moduleId=${moduleId}`
  )

export const postTestTimer = (courseId: number, isStart: boolean) =>
  apiInstance.post<any>(`${process.env.NEXT_PUBLIC_BASE_URL_API}education/course/start-test`, {
    courseId,
    startTest: isStart,
  })

export const getCheckQuizChoice = (choiceId: number) =>
  apiInstance.get<any>(
    `${process.env.NEXT_PUBLIC_BASE_URL_API}education/question/check-answer?choiceId=${choiceId}`
  )

export const getQuizResult = (moduleId: number) =>
  apiInstance.get<{ totalAnswers: number; totalRightAnswers: number; totalWrongAnswers: number }>(
    `${process.env.NEXT_PUBLIC_BASE_URL_API}education/module/result-quiz?moduleId=${moduleId}`
  )

export const getMeCourseList = () =>
  apiInstance.get<{ count: number; results: TCourseResponse[] }>(
    `${process.env.NEXT_PUBLIC_BASE_URL_API}me/courses`,
    {
      params: {
        limit: 1000,
      },
    }
  )

export const getTestQuestions = (courseId: number) =>
  apiInstance.get<{ maximumTime: number; questions: TQuestion[] }>(
    `${process.env.NEXT_PUBLIC_BASE_URL_API}education/question?courseId=${courseId}`
  )

export const saveChoice = (choiceIds: number[]) =>
  apiInstance.post<any>(`${process.env.NEXT_PUBLIC_BASE_URL_API}education/question/save-choice`, {
    choiceIds,
  })

export const getCheckChoice = (choiceId: number) =>
  apiInstance.get<any>(
    `${process.env.NEXT_PUBLIC_BASE_URL_API}education/question/check-answer?choiceId=${choiceId}`
  )

export const getTestResult = (courseId: number) =>
  apiInstance.get<{ approval: boolean; canRetry: boolean; result: number }>(
    `${process.env.NEXT_PUBLIC_BASE_URL_API}education/course/result-test?courseId=${courseId}`
  )

export const postStartQuiz = (moduleId: number) =>
  apiInstance.post<any>(`${process.env.NEXT_PUBLIC_BASE_URL_API}education/module/start-quiz`, {
    moduleId,
  })

export const postStartTest = (payload: { startTest: boolean; courseId: number }) =>
  apiInstance.post(`${process.env.NEXT_PUBLIC_BASE_URL_API}education/course/start-end-test`, {
    ...payload,
  })

export const resetCourse = (courseId: number) =>
  apiInstance.post(`${process.env.NEXT_PUBLIC_BASE_URL_API}education/course/reset`, {
    courseId,
  })

export const postCourse = (payload: CreateCoursePayload) => {
  const formData = new FormData()
  formData.append('title', payload.title)
  formData.append('descriptions', payload.descriptions)
  formData.append('isPublished', payload.isPublished.toString())
  formData.append('profiles', JSON.stringify(payload.profiles))

  if (payload.csvCourse) {
    formData.append('csv_course', payload.csvCourse)
  }
  if (payload.csvQuestions) {
    formData.append('csv_questions', payload.csvQuestions)
  }
  if (payload.image) {
    formData.append('image', payload.image)
  }
  if (payload.certificateValidity) {
    formData.append('certificateValidity', payload.certificateValidity)
  }
  if (payload.benefits) {
    formData.append('benefits', payload.benefits)
  }

  return apiInstance.post<any>(
    `${process.env.NEXT_PUBLIC_BASE_URL_API}education/course`,
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  )
}

export const updateCourseMutate = (payload: CreateCoursePayload, id: number) => {
  const formData = new FormData()
  formData.append('title', payload.title)
  formData.append('descriptions', JSON.stringify(payload.descriptions))
  formData.append('isPublished', payload.isPublished.toString())
  formData.append('profiles', JSON.stringify(payload.profiles))

  if (payload.csvCourse) {
    formData.append('csv_course', payload.csvCourse)
  }
  if (payload.csvQuestions) {
    formData.append('csv_questions', payload.csvQuestions)
  }
  if (payload.image) {
    formData.append('image', payload.image)
  }
  if (payload.certificateValidity) {
    formData.append('certificateValidity', payload.certificateValidity)
  }

  const body = {
    title: payload.title,
    descriptions: payload.descriptions,
    isPublished: payload.isPublished,
    certificateValidity: payload.certificateValidity,
    profiles: payload.profiles,
  }

  return apiInstance.put<any>(`${process.env.NEXT_PUBLIC_BASE_URL_API}education/course/${id}`, body)
}

export const postCertificate = (courseId: number) =>
  apiInstance
    .post<string>(`${process.env.NEXT_PUBLIC_BASE_URL_API}education/course/generate`, {
      courseId,
    })
    .then((response) => response.data)

export const getCertificate = (certificateId: string) =>
  apiInstance
    .get<{
      path: string
    }>(`${process.env.NEXT_PUBLIC_BASE_URL_API}education/certificate/${certificateId}`)
    .then((response) => response.data)
