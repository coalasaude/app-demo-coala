import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useLayout } from '@/hooks/useLayout'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { IErrorResp } from '@/types/error.type'
import { createUserHealthInsurance } from '@/v3/infra/services/user/health-insurance'

export const useMutateCreateHealthInsurance = () => {
  const queryClient = useQueryClient()
  const { showSnackBar } = useLayout()

  const { mutateAsync: createUserHealthInsuranceMutate, isPending: isLoading } = useMutation({
    mutationFn: createUserHealthInsurance,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeyEnum.USER] })
      showSnackBar({
        type: 'success',
        message: 'Convênio criada com sucesso',
      })

      return data
    },
    onError: (error: IErrorResp) => {
      showSnackBar({
        type: 'error',
        message: error.response?.data?.message || 'Não foi possível criar um convênio',
      })
    },
  })

  return {
    createUserHealthInsuranceMutate,
    isLoadingCreate: isLoading,
  }
}
