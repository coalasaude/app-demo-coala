import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { getBrand } from '@/v3/infra/services/organizations/brand'
import { TApiBrand } from '@/v3/domain/api/organizations/ApiOrganizationResponse'
import { Brand } from '@/v3/domain/organizations/Organization'

import { useFetch } from '../../../useFetch'

export const useFetchBrand = (brandId?: number, options?: { selectUserProfileCount?: boolean }) => {
  const { data: resposne, ...rest } = useFetch<TApiBrand>({
    queryFn: () => {
      if (!brandId) return Promise.resolve(null)

      return getBrand(brandId, options)
    },
    queryKey: [QueryKeyEnum.COST_CENTER_BRAND, brandId, options],
  })

  const data = resposne ? new Brand(resposne) : null

  return {
    data,
    ...rest,
  }
}
