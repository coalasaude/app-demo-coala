import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useLayout } from '@/hooks/useLayout'
import { IErrorResp } from '@/types/error.type'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { removeProfile } from '@/v3/infra/services/user/user'

export const useMutateDeleteProfile = () => {
  const queryClient = useQueryClient()
  const { showSnackBar } = useLayout()

  const {
    mutateAsync: deleteProfileMutate,
    isPending: isLoading,
    error,
    ...rest
  } = useMutation({
    mutationFn: (id: number) => removeProfile(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeyEnum.USER_PROFILE] })
      queryClient.invalidateQueries({ queryKey: [QueryKeyEnum.USER] })

      showSnackBar({
        type: 'success',
        message: 'Perfil removido com sucesso',
      })
      return true
    },
    onError: (error: IErrorResp) => {
      showSnackBar({
        type: 'error',
        message: error.response?.data?.message || 'Não foi possível remover o perfil',
      })

      return { error }
    },
  })

  return {
    deleteProfileMutate,
    error,
    rest,
    isLoadingCreateAllergy: isLoading,
  }
}
