import { TApiSaaSSettingsResponse } from '@/v3/domain/api/ApiSaaSSetingsResponse'

import apiRequest from './api'

export const getSettings = () =>
  apiRequest<TApiSaaSSettingsResponse>({
    method: 'GET',
    path: 'v2/saas-settings',
  })
