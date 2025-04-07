import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createManyUserProfessionalReference } from '@/v3/infra/services/user/professional-reference'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'

import { useApiResponseHandler } from '../../useApiResponseHandler'

export const useMutateCreateManyProfessionalReference = () => {
  const queryClient = useQueryClient()
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const { mutateAsync: createManyUserProfessionalReferenceMutate, isPending: isLoading } = useMutation({
    mutationFn: createManyUserProfessionalReference,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeyEnum.USER] })
      onSuccessMessage('Profissional de saúde criada com sucesso')

      return data
    },
    onError: onErrorMessage,
  })

  return {
    createManyUserProfessionalReferenceMutate,
    isLoadingCreate: isLoading,
  }
}
