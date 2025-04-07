import { useRouter } from 'next/router'

import { createFollowUp } from '@/v3/infra/services/appointment/follow-up/follow-up'

import { QueryKeyEnum } from '../../../../enums/query-keys.enum'
import { useApiResponseHandler } from '../../../useApiResponseHandler'
import { useMutate } from '../../@v2/@shared/useMutate'

export const useMutateFollowUp = () => {
  const router = useRouter()
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const {
    mutateAsync: addFollowUp,
    data,
    isPending: isLoading,
    status,
    error,
    isSuccess,
    isError,
    ...rest
  } = useMutate({
    mutationFn: createFollowUp,
    invalidateQueryKey: [
      QueryKeyEnum.APPOINTMENT_MEDICAL_RECORD,
      QueryKeyEnum.APPOINTMNET_FOLLOW_UP,
    ],

    onSuccess: () => {
      onSuccessMessage('Acompanhamento cadastrado com sucesso')
      router.back()
    },

    onError: onErrorMessage,
  })

  return {
    addFollowUp,
    isSuccess,
    isError,
    data,
    isLoadingStatus: isLoading,
    status,
    error: error?.response.data.message,
    rest,
  }
}
