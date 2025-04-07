import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import {
  readAttachment,
  ReadAttachmentParams,
} from '@/v3/infra/services/@v2/appointment/attachment/read-attachment'

import { useFetch } from '../../@shared/useFetch'

export const useFetchReadAttachment = (params: ReadAttachmentParams) => {
  const { data, ...response } = useFetch({
    queryFn: () => readAttachment(params),
    queryKey: [QueryKeyEnum.APPOINTMENT_ATTACHMENT, params.appointmentId, params.attachmentId],
  })

  return {
    ...response,
    attachment: data,
  }
}
