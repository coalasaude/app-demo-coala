import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useLayout } from '@/hooks/useLayout'
import { IErrorResp } from '@/types/error.type'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { removePictureProfile } from '@/v3/infra/services/user/user'

export const useMutateDeletePictureProfile = () => {
  const queryClient = useQueryClient()
  const { showSnackBar } = useLayout()

  const {
    mutateAsync: deletePictureProfileMutate,
    isPending: isLoading,
    error,
    ...rest
  } = useMutation({
    mutationFn: removePictureProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeyEnum.USER] })
      showSnackBar({
        type: 'success',
        message: 'Foto removida com sucesso',
      })
      return true
    },
    onError: (error: IErrorResp) => {
      showSnackBar({
        type: 'error',
        message: error.response?.data?.message || 'Não foi possível remover a foto',
      })

      return { error }
    },
  })

  return {
    deletePictureProfileMutate,
    error,
    rest,
    isLoading,
  }
}
