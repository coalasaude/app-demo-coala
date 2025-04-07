import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createUserProfessionalReference } from '@/v3/infra/services/user/professional-reference'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'

import { useApiResponseHandler } from '../../useApiResponseHandler'

export const useMutateCreateProfessionalReference = () => {
  const queryClient = useQueryClient()
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const { mutateAsync: createUserProfessionalReferenceMutate, isPending: isLoading } = useMutation({
    mutationFn: createUserProfessionalReference,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeyEnum.USER] })
      onSuccessMessage('Profissional da saúde criada com sucesso')

      return data
    },
    onError: onErrorMessage,
  })

  return {
    createUserProfessionalReferenceMutate,
    isLoadingCreate: isLoading,
  }
}
