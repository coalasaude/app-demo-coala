import { addAttachmentDocument } from '@/v3/infra/services/@v2/appointment/attachment/add-attachment-document'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'

import { useMutate } from '../../@shared/useMutate'

export const useMutateAddAttachmentDocument = () => {
  const { onErrorMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: addAttachmentDocument,
    invalidateQueryKey: false,
    onError: onErrorMessage,
  })

  return mutate
}
