import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createManyUserHealthInsurance } from '@/v3/infra/services/user/health-insurance'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'

import { useApiResponseHandler } from '../../useApiResponseHandler'

export const useMutateManyCreateHealthInsurance = () => {
  const queryClient = useQueryClient()
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const { mutateAsync: createManyUserHealthInsuranceMutate, isPending: isLoading } = useMutation({
    mutationFn: createManyUserHealthInsurance,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeyEnum.USER] })
      onSuccessMessage('Convênio criada com sucesso')

      return data
    },
    onError: onErrorMessage,
  })

  return {
    createManyUserHealthInsuranceMutate,
    isLoadingCreate: isLoading,
  }
}
