import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { addPrescription } from '@/v3/infra/services/appointment/records/prescriptions'

import { useMutate } from '../../@v2/@shared/useMutate'
import { useApiResponseHandler } from '../../../useApiResponseHandler'

export function useMutateAddPrescription() {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: addPrescription,
    invalidateQueryKey: [QueryKeyEnum.APPOINTMENT_PRESCRIPTION],
    onSuccess: () => {
      onSuccessMessage('Receituário cadastrado com sucesso')
    },
    onError: onErrorMessage,
  })

  return mutate
}
