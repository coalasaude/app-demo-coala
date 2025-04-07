import { useMutation } from '@tanstack/react-query'

import { getCEPInfos } from '@/v3/infra/services/utils'
import { IErrorResp } from '@/types/error.type'
import { useLayout } from '@/hooks/useLayout'

export const useMutateCEP = () => {
  const { showSnackBar } = useLayout()

  const response = useMutation({
    mutationFn: getCEPInfos,
    onError: (error: IErrorResp) => {
      showSnackBar({
        type: 'error',
        message: error.response?.data?.message || 'Não foi possível encontrar o CEP',
      })
    },
  })

  return response
}
