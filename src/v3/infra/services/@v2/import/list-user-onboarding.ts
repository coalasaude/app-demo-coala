import { OnboardingModel, OnboardingModelConstructor } from '@/v3/domain/@v2/import'
import { ProfileBrowseModel } from '@/v3/domain/@v2/users/profiles/profiles-browse.model'

import apiRequest from '../../api'
import { browseProfiles } from '../users/profiles/browse-profiles'

export interface ListUserOnboardingParams {
  institutionId?: number
  profileId?: number
}

export async function listUserOnboarding(params: ListUserOnboardingParams) {
  const [data, browseProfilesRepsonse] = (await Promise.all([
    apiRequest({
      method: 'GET',
      throwError: true,
      path: 'v2/imports/users',
      queryParams: params,
    }),
    browseProfiles(),
  ])) as [
    OnboardingModelConstructor<{ profileId: number; institutionId: number }>[],
    ProfileBrowseModel,
  ]

  return data.map(
    (item) =>
      new OnboardingModel<{ profile: string }>({
        ...item,
        createdAt: new Date(item.createdAt),
        data: {
          profile: getProfileName(item.data.profileId, browseProfilesRepsonse),
        },
      }),
  )
}

function getProfileName(profileId: number, profiles: ProfileBrowseModel) {
  return profiles.data.find((profile) => profile.id === profileId)?.name || ''
}
