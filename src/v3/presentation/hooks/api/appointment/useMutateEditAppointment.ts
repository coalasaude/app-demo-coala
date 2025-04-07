import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'

import { IErrorResp } from '@/types/error.type'
import { useLayout } from '@/hooks/useLayout'
import { updateAppointment } from '@/v3/infra/services/appointment'
import { bindPathParams } from '@/utils/bindParams'
import { NEW_ROUTES } from '@/constants/routes'

export const useMutateEditAppointment = () => {
  const { showSnackBar } = useLayout()
  const router = useRouter()

  const {
    mutateAsync: editAppointment,
    data,
    isPending: isLoading,
    status,
    error,
  } = useMutation({
    mutationFn: updateAppointment,

    onSuccess: (response) => {
      showSnackBar({
        type: 'success',
        message: 'Atendimento atualizado com sucesso',
      })
      router.push(
        bindPathParams(NEW_ROUTES.AUTHENTICATED.APPOINTMENT.VIEW.path, {
          id: String(response?.id),
        }),
      )
    },

    onError: (error: IErrorResp) => {
      showSnackBar({
        type: 'error',
        message: error.response?.data?.message || 'Não foi possível atualizar atendimento',
      })
    },
  })

  return {
    editAppointment,
    data,
    isLoadingStatus: isLoading,
    status,
    error: error?.response?.data?.message,
  }
}
