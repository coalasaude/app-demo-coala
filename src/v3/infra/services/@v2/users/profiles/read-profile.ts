import { ProfileModel, ProfileModelConstructor } from '@/v3/domain/@v2/users/profiles/profile.model'

import apiRequest from '../../../api'

export type ReadProfileResponse = ProfileModelConstructor

export interface ReadProfileParams {
  profileId?: number
}

export async function readProfile({ profileId }: ReadProfileParams) {
  const data = (await apiRequest<ReadProfileResponse>({
    method: 'GET',
    throwError: true,
    path: 'v2/profiles/:profileId',
    pathParams: { profileId },
  })) as ReadProfileResponse

  return new ProfileModel(data)
}
