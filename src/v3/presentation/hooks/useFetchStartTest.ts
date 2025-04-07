import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'

import { postStartTest } from '@/v3/infra/services/course'

export const useFetchStartTest = () => {
  const { invalidateQueries } = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: postStartTest,
    onSuccess: () => {
      invalidateQueries({ queryKey: ['startTest'] })
    },
  })

  const startTest = React.useCallback(
    (id: number) => mutate({ startTest: true, courseId: id }),
    [mutate]
  )

  const endTest = React.useCallback(
    (id: number) => mutate({ startTest: false, courseId: id }),
    [mutate]
  )

  return {
    startTest,
    endTest,
  }
}
