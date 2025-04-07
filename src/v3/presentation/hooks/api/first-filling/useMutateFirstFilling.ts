import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useLayout } from '@/hooks/useLayout'
import { IErrorResp } from '@/types/error.type'
import { createUserFirsFillingStep } from '@/v3/infra/services/first-filling'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'

export const useMutateUserFirstFilling = ({ invalidate = true }: { invalidate?: boolean }) => {
  const queryClient = useQueryClient()
  const { showSnackBar } = useLayout()

  const { mutateAsync: firstFillingMutate, isPending: isLoading } = useMutation({
    mutationFn: createUserFirsFillingStep,
    onSuccess: (data) => {
      if (invalidate) {
        queryClient.invalidateQueries({ queryKey: [QueryKeyEnum.FIRST_FILLING] })
        queryClient.invalidateQueries({ queryKey: [QueryKeyEnum.PENDING_ACTIONS] })
      }
      return data
    },
    onError: (error: IErrorResp) => {
      showSnackBar({
        type: 'error',
        message: error.response?.data?.message || 'Não foi possível seguir com o caminho',
      })
    },
  })

  return {
    firstFillingMutate,
    isLoadingCreateFirstFills: isLoading,
  }
}
