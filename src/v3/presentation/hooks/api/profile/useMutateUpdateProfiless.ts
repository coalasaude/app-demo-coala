import { useMutation, useQueryClient } from '@tanstack/react-query'

import { updateProfiles } from '@/v3/infra/services/profiles/profiles'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useLayout } from '@/hooks/useLayout'
import { IErrorResp } from '@/types/error.type'

export const useMutateUpdateProfiles = () => {
  const queryClient = useQueryClient()
  const { showSnackBar } = useLayout()

  const { mutateAsync: updateProfileMutate, isPending } = useMutation({
    mutationFn: updateProfiles,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeyEnum.PROFILES] })
      showSnackBar({
        type: 'success',
        message: 'Perfil atualizado com sucesso',
      })

      return data
    },
    onError: (error: IErrorResp) => {
      showSnackBar({
        type: 'error',
        message: error.response?.data?.message || 'Erro ao atualizar perfil',
      })
    },
  })

  return {
    updateProfileMutate,
    isLoading: isPending,
  }
}
