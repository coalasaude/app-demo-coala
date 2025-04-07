import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import {
  readSickNote,
  ReadSickNoteParams,
} from '@/v3/infra/services/@v2/health-history/sick-note/read-sick-note'

import { useFetch } from '../../@shared/useFetch'

export const useFetchReadHistorySickNote = (params: ReadSickNoteParams) => {
  const { data, ...response } = useFetch({
    queryFn: () => readSickNote(params),
    queryKey: [QueryKeyEnum.HISTORY_SICKNOTE, params.userId, params.sickNoteId],
  })

  return {
    ...response,
    sickNote: data,
  }
}
