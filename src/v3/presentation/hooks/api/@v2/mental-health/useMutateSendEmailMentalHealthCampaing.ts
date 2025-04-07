import { sendEmailMentalHealthCampaing } from '@/v3/infra/services/@v2/mental-health/campaing/send-email'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'

import { useMutate } from '../@shared/useMutate'

export const useMutateSendEmailMentalHealthCampaing = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: sendEmailMentalHealthCampaing,
    invalidateQueryKey: [],
    onSuccess: () => {
      onSuccessMessage('Enviamos em seu e-mail com mais informações')
    },
    onError: onErrorMessage,
  })

  return mutate
}
