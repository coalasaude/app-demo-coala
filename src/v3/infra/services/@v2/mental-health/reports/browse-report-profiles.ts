import {
  ReportProfileBrowseModel,
  ReportProfileBrowseModelConstructor,
} from '@/v3/domain/@v2/mental-health/reports/report-profile/report-profiles-browse.model'

import apiRequest from '../../../api'

export type BrowseReportProfileResponse = ReportProfileBrowseModelConstructor

export async function browseReportProfiles() {
  const response = (await apiRequest<BrowseReportProfileResponse>({
    method: 'GET',
    throwError: true,
    path: 'v2/users/:userId/mental-health/profiles',
  })) as BrowseReportProfileResponse

  return new ReportProfileBrowseModel(response)
}
