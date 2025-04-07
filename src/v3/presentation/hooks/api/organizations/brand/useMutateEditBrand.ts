import { useMutation } from '@tanstack/react-query'

import { useLayout } from '@/hooks/useLayout'
import { IErrorResp } from '@/types/error.type'
import { editBrand } from '@/v3/infra/services/organizations/brand'

export const useMutateEditBrand = () => {
  const { showSnackBar } = useLayout()

  const { mutateAsync, isPending: isLoading } = useMutation({
    mutationFn: editBrand,

    onSuccess: () => {
      showSnackBar({
        type: 'success',
        message: 'A marca foi atualizada!',
      })
    },

    onError: (error: IErrorResp) => {
      showSnackBar({
        type: 'error',
        message: error.response?.data?.message || 'Não foi possível atualizar a marca',
      })
    },
  })

  return { mutateAsync, isLoading }
}
