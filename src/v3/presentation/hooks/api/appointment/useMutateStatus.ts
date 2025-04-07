import { useMutation } from '@tanstack/react-query'

import { changeAppointmentStatus } from '@/v3/infra/services/appointment'
import { IErrorResp } from '@/types/error.type'
import { useLayout } from '@/hooks/useLayout'

export const useMutateStatus = () => {
  const { showSnackBar } = useLayout()

  const {
    mutateAsync: statusMutate,
    isPending: isLoading,
    status,
  } = useMutation({
    mutationFn: changeAppointmentStatus,

    onSuccess: () => {
      showSnackBar({
        type: 'success',
        message: 'Status atualizado com sucesso!',
      })
    },

    onError: (error: IErrorResp) => {
      showSnackBar({
        type: 'error',
        message: error.response?.data?.message || 'Não foi possível atualizar o status',
      })
    },
  })

  return {
    statusMutate,
    isLoadingStatus: isLoading,
    status,
  }
}
