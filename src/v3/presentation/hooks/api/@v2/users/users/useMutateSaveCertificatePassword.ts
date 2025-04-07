import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { saveCertificate } from '@/v3/infra/services/@v2/users/users/save-certificate'

import { useMutate } from '../../@shared/useMutate'

export const useMutateSaveCertificatePassword = () => {
  const { onErrorMessage, onSuccessMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: saveCertificate,
    invalidateQueryKey: [QueryKeyEnum.USER],
    onSuccess: () => {
      onSuccessMessage('Senha salva com sucesso')
    },
    onError: onErrorMessage,
  })

  return mutate
}
