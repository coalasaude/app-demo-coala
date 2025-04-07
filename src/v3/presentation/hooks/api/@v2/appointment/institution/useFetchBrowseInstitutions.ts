import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import {
  browseAppointmentInstitutions,
  BrowseAppointmentInstitutionParams,
} from '@/v3/infra/services/@v2/appointment/institution/browse-institutions'

import { useFetch } from '../../@shared/useFetch'

export const useFetchBrowseAppointmentInstitutions = (
  params: BrowseAppointmentInstitutionParams,
) => {
  const { data, ...response } = useFetch({
    queryFn: () => browseAppointmentInstitutions(params),
    queryKey: [QueryKeyEnum.APPOINTMENT_INSTITUTION, params],
  })

  return {
    ...response,
    institutions: data,
  }
}
