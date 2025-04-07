import { createMedicalRecord } from '@/v3/infra/services/appointment/medical-record/medical-record'

import { QueryKeyEnum } from '../../../../enums/query-keys.enum'
import { useApiResponseHandler } from '../../../useApiResponseHandler'
import { useMutate } from '../../@v2/@shared/useMutate'

export const useMutateMedicalRecord = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const {
    mutateAsync: addMedicalRecord,
    data,
    isPending: isLoading,
    status,
    error,
    isSuccess,
    isError,
    ...rest
  } = useMutate({
    mutationFn: createMedicalRecord,
    invalidateQueryKey: [QueryKeyEnum.APPOINTMENT_MEDICAL_RECORD, QueryKeyEnum.TIMELINE],

    onSuccess: () => {
      onSuccessMessage('Registro criado com sucesso')
    },

    onError: onErrorMessage,
  })

  return {
    addMedicalRecord,
    isSuccess,
    isError,
    data,
    isLoadingStatus: isLoading,
    status,
    error: error?.response.data.message,
    rest,
  }
}
