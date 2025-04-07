import { useMutation, useQueryClient } from '@tanstack/react-query'

import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useLayout } from '@/hooks/useLayout'
import { IErrorResp } from '@/types/error.type'
import { putHealthLeader } from '@/v3/infra/services/user/user'

export const useMutationHealthLeader = () => {
  const queryClient = useQueryClient()
  const { showSnackBar } = useLayout()

  const {
    mutateAsync: updateHealthLeader,
    data,
    error,
    ...rest
  } = useMutation({
    mutationFn: putHealthLeader,
    onSuccess: (_, body) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeyEnum.USER_PROFILE] })
      queryClient.invalidateQueries({ queryKey: [QueryKeyEnum.USER, body?.userId] })

      showSnackBar({
        message: 'Líder de saúde atualizado com sucesso',
        type: 'success',
      })

      return body
    },
    onError: (error: IErrorResp) => {
      showSnackBar({
        message: error.response?.data?.message || 'Erro ao atualizar Líder de saúde',
        type: 'error',
      })
    },
  })

  return {
    data,
    error,
    updateHealthLeader,
    ...rest,
  }
}
