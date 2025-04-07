import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import {
  readSickNote,
  ReadSickNoteParams,
} from '@/v3/infra/services/@v2/appointment/sick-note/read-sick-note'

import { useFetch } from '../../@shared/useFetch'

export const useFetchReadSickNote = (params: ReadSickNoteParams) => {
  const { data, ...response } = useFetch({
    queryFn: () => readSickNote(params),
    queryKey: [QueryKeyEnum.APPOINTMENT_SICK_NOTE, params.appointmentId, params.sickNoteId],
  })

  return {
    ...response,
    sicknote: data,
  }
}
