import {
  SurveyBrowseModel,
  SurveyBrowseModelConstructor,
} from '@/v3/domain/@v2/survey/survey-browse.model'

import apiRequest from '../../api'

export type BrowseSurveyResponse = SurveyBrowseModelConstructor

export interface BrowseSurveyParams {
  appointmentId?: number
}

export async function browseSurvey(params?: BrowseSurveyParams) {
  const response = (await apiRequest<BrowseSurveyResponse>({
    method: 'GET',
    throwError: true,
    path: 'v2/survey',
    queryParams: {
      appointmentId: params?.appointmentId,
    },
  })) as BrowseSurveyResponse

  return new SurveyBrowseModel(response)
}
