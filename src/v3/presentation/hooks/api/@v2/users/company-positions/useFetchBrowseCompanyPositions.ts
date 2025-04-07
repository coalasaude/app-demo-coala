import { browseCompanyPosition } from '@/v3/infra/services/@v2/users/company-positions/browse-company-positions'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useFetch } from '@/v3/presentation/hooks/api/@v2/@shared/useFetch'

export const useFetchBrowseCompanyPosition = () => {
  const { data, ...response } = useFetch({
    queryFn: () => browseCompanyPosition(),
    queryKey: [QueryKeyEnum.COMPANY_POSITION],
  })

  return {
    ...response,
    companyPositions: data,
  }
}
