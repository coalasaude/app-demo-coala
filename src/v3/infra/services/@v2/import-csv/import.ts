import { appendFormData } from '@/v3/utils/append-form-data'

import apiRequest from '../../api'

export interface ImportCsvParams {
  institutionId: number
  profileId: number
  file: File
}

export async function importCsv(params: ImportCsvParams) {
  const formData = appendFormData(params)

  return (await apiRequest({
    method: 'POST',
    throwError: true,
    path: `v2/imports/users`,
    body: formData,
    cType: 'multipart/form-data',
  })) as void
}
