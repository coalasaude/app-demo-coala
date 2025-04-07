import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useLayout } from '@/hooks/useLayout'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { IErrorResp } from '@/types/error.type'
import { deleteUserHealthInsurance } from '@/v3/infra/services/user/health-insurance'

export const useMutateDeleteHealthInsurance = () => {
  const queryClient = useQueryClient()
  const { showSnackBar } = useLayout()

  const { mutateAsync: deleteUserHealthInsuranceMutate, isPending: isLoading } = useMutation({
    mutationFn: deleteUserHealthInsurance,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeyEnum.USER] })
      showSnackBar({
        type: 'success',
        message: 'Convênio deletado com sucesso',
      })

      return data
    },
    onError: (error: IErrorResp) => {
      showSnackBar({
        type: 'error',
        message: error.response?.data?.message || 'Não foi possível deletar um convênio',
      })
    },
  })

  return {
    deleteUserHealthInsuranceMutate,
    isLoadingHealthInsuranceDelete: isLoading,
  }
}
