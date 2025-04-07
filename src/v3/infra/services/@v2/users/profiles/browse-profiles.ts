
import { ProfileBrowseModel, ProfileBrowseModelConstructor } from '@/v3/domain/@v2/users/profiles/profiles-browse.model'

import apiRequest from '../../../api'

type BrowseProfileResponse = ProfileBrowseModelConstructor

export async function browseProfiles() {
  const data = (await apiRequest({
    method: 'GET',
    throwError: true,
    path: 'v2/profiles',
  })) as BrowseProfileResponse

  return new ProfileBrowseModel({
    pagination: data.pagination,
    data: data.data,
  })
}
