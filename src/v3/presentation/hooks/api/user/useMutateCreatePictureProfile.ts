import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useLayout } from '@/hooks/useLayout'
import { IErrorResp } from '@/types/error.type'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { addPictureProfile } from '@/v3/infra/services/user/user'

/**
 * @deprecated - Use useMutateAddUserImage from v2
 */
export const useMutateCreatePictureProfile = () => {
  const queryClient = useQueryClient()
  const { showSnackBar } = useLayout()

  const {
    mutateAsync: createPictureProfileMutate,
    isPending: isLoading,
    error,
    ...rest
  } = useMutation({
    mutationFn: addPictureProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeyEnum.USER] })
      showSnackBar({
        type: 'success',
        message: 'Foto cadastrada com sucesso',
      })
      return true
    },
    onError: (error: IErrorResp) => {
      showSnackBar({
        type: 'error',
        message: error.response?.data?.message || 'Não foi possível cadastrar a foto',
      })

      return { error }
    },
  })

  return {
    createPictureProfileMutate,
    error,
    rest,
    isLoading,
  }
}
