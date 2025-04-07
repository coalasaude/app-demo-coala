import { UserStatus } from '@/types/user'
import {
  UsersBrowseModel,
  UsersBrowseModelConstructor,
} from '@/v3/domain/@v2/users/users-browse.model'
import { cleanTelephone } from '@/utils/cleanTelephone'

import apiRequest from '../../../api'

export type BrowseUserResponse = UsersBrowseModelConstructor

export interface BrowseUserParams {
  offset?: number
  limit?: number
  searchUser?: string
  searchInstitution?: string
  searchCpf?: string
  searchPermissions?: string
  institutionId?: number
  status?: UserStatus
  profileId?: number
  onlyStudent?: boolean
  responsibleId?: number
  userId?: number
  searchEmail?: string
  searchTelephone?: string
  searchWithResponsible?: boolean
  hasResponsible?: boolean
  searchOnlyEmail?: boolean
  brandId?: number
  networkId?: number
  onlyInactiveProfiles?: boolean
  direction?: 'asc' | 'desc'
  orderBy?: 'name' | 'status'
}

export async function browseUser(params: BrowseUserParams) {
  const queryParams = {
    ...params,
    searchTelephone: params.searchTelephone ? cleanTelephone(params.searchTelephone) : '',
  }
  const data = (await apiRequest<BrowseUserResponse>({
    method: 'GET',
    throwError: true,
    path: 'v2/users',
    queryParams,
  })) as BrowseUserResponse

  return new UsersBrowseModel(data)
}
