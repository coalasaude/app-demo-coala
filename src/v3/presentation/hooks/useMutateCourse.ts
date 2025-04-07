import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
  postCourse,
  updateCourseMutate,
  deleteCourse,
  postCertificate,
  resetCourse,
} from '@/v3/infra/services/course'
import { useLayout } from '@/hooks/useLayout'

export interface CreateCoursePayload {
  csvCourse?: File
  csvQuestions?: File
  image?: File
  title: string
  descriptions: string
  isPublished: boolean
  id?: number
  certificateValidity?: string
  benefits?: string
  profiles: number[]
}

export const useMutateCourse = () => {
  const { invalidateQueries } = useQueryClient()
  const { showSnackBar } = useLayout()

  const { mutate: createCourseMutate } = useMutation({
    mutationFn: postCourse,
    onSuccess: () => {
      invalidateQueries({ queryKey: ['course', 'courses'] })
      showSnackBar({
        type: 'success',
        message: 'Curso Criado com sucesso',
      })
    },
  })

  const { mutate: mutateToDelete } = useMutation({
    mutationFn: deleteCourse,
    onSuccess: () => {
      invalidateQueries({ queryKey: ['course', 'courses'] })
    },
  })

  const { mutate: mutatePostCertificate, data: certificateUrl } = useMutation({
    mutationFn: postCertificate,
    onSuccess: (data) => {
      return data
    },
  })

  const { mutate } = useMutation({
    mutationFn: resetCourse,
    onSuccess: () => {
      invalidateQueries({ queryKey: ['resetCourse'] })
    },
  })

  const resetCourseUser = React.useCallback((courseId: number) => mutate(courseId), [mutate])

  const createCourse = React.useCallback(
    (payload: CreateCoursePayload) => createCourseMutate(payload),
    [createCourseMutate]
  )

  const updateCourse = React.useCallback(
    (payload: CreateCoursePayload, id: number) => updateCourseMutate(payload, id),
    []
  )

  const reqDeleteCourse = React.useCallback(
    (id: number) => {
      mutateToDelete(id)
    },
    [mutateToDelete]
  )

  const createCertificate = React.useCallback(
    (courseId: number) => mutatePostCertificate(courseId),

    [mutatePostCertificate]
  )
  return {
    updateCourse,
    createCourse,
    reqDeleteCourse,
    createCertificate,
    certificateUrl,
    resetCourseUser,
  }
}
