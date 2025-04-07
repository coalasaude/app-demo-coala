import { TApiCEPResponse } from '@/v3/domain/api/ApiCEPResponse'

import apiRequest from './api'

export const getCEPInfos = async ({ cep }: { cep: string }) => {
  const cepOnlyNums = cep.replace(/\D/gi, '')

  return apiRequest<TApiCEPResponse>({
    path: `https://viacep.com.br/ws/${cepOnlyNums}/json/`,
    method: 'GET',
    useExternalPath: true,
    returnError: true,
    useApiFilters: false,
  })
}
