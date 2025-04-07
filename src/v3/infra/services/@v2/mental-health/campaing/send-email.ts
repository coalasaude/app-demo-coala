import apiRequest from '../../../api'

export interface SendEmailMentalHealthCampaingParams {
  product: 'mental-health' | 'therapy' | 'inclusion'
}

export async function sendEmailMentalHealthCampaing({
  ...params
}: SendEmailMentalHealthCampaingParams) {
  await apiRequest({
    method: 'POST',
    throwError: true,
    path: 'v2/mental-health/campaing',
    body: params,
  })
}
