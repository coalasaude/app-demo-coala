import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useLayout } from '@/hooks/useLayout'
import { IErrorResp } from '@/types/error.type'
import { removeProfile } from '@/v3/infra/services/profiles/profiles'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'

export const useMutateRemoveProfile = () => {
  const queryClient = useQueryClient()
  const { showSnackBar } = useLayout()

  const { mutateAsync: removeProfileMutate, isPending: isLoading } = useMutation({
    mutationFn: removeProfile,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeyEnum.PROFILES] })
      showSnackBar({
        type: 'success',
        message: 'Perfil removido com sucesso',
      })

      return data
    },
    onError: (error: IErrorResp) => {
      showSnackBar({
        type: 'error',
        message: error.response?.data?.message || 'Erro ao remover perfil',
      })
    },
  })

  return {
    removeProfileMutate,
    isLoading,
  }
}
