import { useMutation } from '@tanstack/react-query'

import { useLayout } from '@/hooks/useLayout'
import { IErrorResp } from '@/types/error.type'
import { addBrand } from '@/v3/infra/services/organizations/brand'

export const useMutateAddBrand = () => {
  const { showSnackBar } = useLayout()

  const { mutateAsync: addBrandMutate,isPending:  isLoading } = useMutation({
    mutationFn: addBrand,
    onSuccess: () => {
      showSnackBar({
        type: 'success',
        message: 'A marca foi cadastrada!',
      })
    },
    onError: (error: IErrorResp) => {
      showSnackBar({
        type: 'error',
        message: error.response?.data?.message || 'Não foi possível cadastrar a marca',
      })
    },
  })

  return {
    addBrandMutate,
    isLoadingAddBrand: isLoading,
  }
}
