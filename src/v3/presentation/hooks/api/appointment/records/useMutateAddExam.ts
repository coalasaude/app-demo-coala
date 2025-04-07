import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { addExam } from '@/v3/infra/services/appointment/records/exams'

import { useMutate } from '../../@v2/@shared/useMutate'
import { useApiResponseHandler } from '../../../useApiResponseHandler'

export function useMutateAddExam() {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: addExam,
    invalidateQueryKey: [QueryKeyEnum.APPOINTMENT_EXAM],
    onSuccess: () => {
      onSuccessMessage('Exame cadastrado com sucesso')
    },
    onError: onErrorMessage,
  })

  return mutate
}
