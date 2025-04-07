import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'

import { createDiagnose } from '@/v3/infra/services/appointment/cid/cid'

import { useApiResponseHandler } from '../../../useApiResponseHandler'

export const useMutateDiagnose = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()
  const router = useRouter()

  const {
    mutateAsync: addDiagnose,
    data,
    isPending: isLoading,
    status,
    error,
  } = useMutation({
    mutationFn: createDiagnose,

    onSuccess: () => {
      onSuccessMessage('CID adicionado com sucesso')
      router.back()
    },

    onError: onErrorMessage,
  })

  return {
    addDiagnose,
    data,
    isLoadingStatus: isLoading,
    status,
    error: error?.response.data.message,
  }
}
