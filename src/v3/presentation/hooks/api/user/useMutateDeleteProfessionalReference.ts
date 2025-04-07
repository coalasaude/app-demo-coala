import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useLayout } from '@/hooks/useLayout'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { IErrorResp } from '@/types/error.type'
import { deleteUserProfessionalReference } from '@/v3/infra/services/user/professional-reference'

/**
 * @deprecated - Use useMutateDeleteProfessionalReference from v2
 */
export const useMutateDeleteProfessionalReference = () => {
  const queryClient = useQueryClient()
  const { showSnackBar } = useLayout()

  const { mutateAsync: deleteUserProfessionalReferenceMutate, isPending: isLoading } = useMutation({
    mutationFn: deleteUserProfessionalReference,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeyEnum.USER] })
      showSnackBar({
        type: 'success',
        message: 'Profissional de saúde deletado com sucesso',
      })

      return data
    },
    onError: (error: IErrorResp) => {
      showSnackBar({
        type: 'error',
        message:
          error.response?.data?.message || 'Não foi possível deletar o profissional de saúde',
      })
    },
  })

  return {
    deleteUserProfessionalReferenceMutate,
    isLoadingProfessionalReferenceDelete: isLoading,
  }
}
