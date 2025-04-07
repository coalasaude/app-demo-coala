import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { addSurveyAnswer } from '@/v3/infra/services/@v2/survey/add-survey-answer'

import { useMutate } from '../@shared/useMutate'

export const useMutateAddSurveyAnswer = () => {
  const { onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: addSurveyAnswer,
    invalidateQueryKey: () => [QueryKeyEnum.SURVEY],
    onSuccess: () => onSuccessMessage('Resposta enviada!'),
  })

  return mutate
}
