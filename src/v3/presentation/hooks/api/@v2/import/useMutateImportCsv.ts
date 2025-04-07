import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useApiResponseHandler } from '@/v3/presentation/hooks/useApiResponseHandler'
import { extractApiError } from '@/v3/utils/extract-api-error'
import { importCsv } from '@/v3/infra/services/@v2/import-csv/import'

import { useMutate } from '../@shared/useMutate'

export const useMutateImportCsv = () => {
  const { onErrorMessage, onInfoMessage } = useApiResponseHandler()

  const mutate = useMutate({
    mutationFn: importCsv,
    invalidateQueryKey: [QueryKeyEnum.IMPORT],
    onSuccess: () =>
      onInfoMessage(
        'A planilha implantada está sendo processada. Verifique o seu e-mail para identificar possíveis erros.',
      ),
    onError: onErrorMessage,
  })

  const errorMessage: string | null = mutate.error ? extractApiError(mutate.error) : null

  return { ...mutate, errorMessage }
}
