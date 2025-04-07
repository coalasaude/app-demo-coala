import { useMutation, useQueryClient } from '@tanstack/react-query'

import { postProfiles } from '@/v3/infra/services/profiles/profiles'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useLayout } from '@/hooks/useLayout'
import { IErrorResp } from '@/types/error.type'

export const useMutateCreateProfiles = () => {
  const queryClient = useQueryClient()
  const { showSnackBar } = useLayout()

  const { mutateAsync: createProfileMutate, isPending } = useMutation({
    mutationFn: postProfiles,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeyEnum.PROFILES] })
      showSnackBar({
        type: 'success',
        message: 'Perfil criado com sucesso',
      })

      return data
    },
    onError: (error: IErrorResp) => {
      showSnackBar({
        type: 'error',
        message: error.response?.data?.message || 'Erro ao criar perfil',
      })
    },
  })

  return {
    createProfileMutate,
    isLoading: isPending,
  }
}
