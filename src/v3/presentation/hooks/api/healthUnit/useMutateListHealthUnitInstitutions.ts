import { useMutation } from '@tanstack/react-query'

import { getHealthUnitInstitutions } from '@/v3/infra/services/healthUnit'
import { IErrorResp } from '@/types/error.type'
import { useLayout } from '@/hooks/useLayout'

/**
 * @deprecated use useFetchInstitutions from health unit v2 instead
 */
export const useMutateListHealthUnitInstitutions = () => {
  const { showSnackBar } = useLayout()
  const response = useMutation({
    mutationFn: getHealthUnitInstitutions,
    onError: (error: IErrorResp) => {
      showSnackBar({
        type: 'error',
        message: error.response?.data?.message || 'Não foi possível buscar instituições',
      })
    },
  })

  return response
}
