import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import {
  browseSickNote,
  BrowseSickNoteParams,
} from '@/v3/infra/services/@v2/health-history/sick-note/browse-sick-note'

import { useFetch } from '../../@shared/useFetch'

export const useFetchBrowseHistorySickNote = (params: BrowseSickNoteParams) => {
  const { data, ...response } = useFetch({
    queryFn: () => browseSickNote(params),
    queryKey: [QueryKeyEnum.HISTORY_SICKNOTE, params.userId],
  })

  return {
    ...response,
    sickNotes: data,
  }
}
