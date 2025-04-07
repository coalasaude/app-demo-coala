import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'

import { postStartQuiz } from '@/v3/infra/services/course'

export const useFetchStartQuiz = () => {
  const { invalidateQueries } = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: postStartQuiz,
    onSuccess: () => {
      invalidateQueries({ queryKey: ['startQuiz'] })
    },
  })

  const startQuiz = React.useCallback((id: number) => mutate(id), [mutate])

  return {
    startQuiz,
  }
}
