import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'

import { saveChoice } from '@/v3/infra/services/course'

export const useFetchSaveAnswer = () => {
  const { invalidateQueries } = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: saveChoice,
    onSuccess: () => {
      invalidateQueries({ queryKey: ['choice'] })
    },
  })

  const saveAnswer = React.useCallback((ids: number[]) => mutate(ids), [mutate])

  return {
    saveAnswer,
  }
}
