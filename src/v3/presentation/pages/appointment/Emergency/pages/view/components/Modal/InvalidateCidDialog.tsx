import { Dialog } from '@mui/material'
import { useRouter } from 'next/router'

import { NEW_ROUTES } from '@/constants/routes'
import { useLazyFetch } from '@/hooks/useFetch'
import { useLayout } from '@/hooks/useLayout'
import { bindPathParams } from '@/utils/bindParams'
import { CDialogue } from '@/v3/presentation/components/Modal'

interface IModal {
  appointmentId?: number
  open?: boolean
  onClose: () => void
  id: number
  onSuccess: () => void
}

export const InvalidateCidDialog = ({ open, id, appointmentId, onClose, onSuccess }: IModal) => {
  const [apiRequest] = useLazyFetch()
  const { showSnackBar } = useLayout()
  const router = useRouter()

  const onRemove = async () => {
    const { error } = await apiRequest({
      path: `appointments/${appointmentId}/cid/${id}`,
      method: 'DELETE',
      pathParams: { id },
    })

    if (!error) {
      showSnackBar({
        message: 'Diagnóstico invalidado com sucesso',
        type: 'success',
      })
      onSuccess()
      onClose()
      router.push(
        bindPathParams(NEW_ROUTES.AUTHENTICATED.APPOINTMENT.VIEW.path, {
          id: appointmentId,
        }),
      )
      return
    }
    showSnackBar({
      message: error?.data?.message,
      type: 'error',
    })
    onClose()
    return
  }

  return (
    <Dialog
      open={!!open}
      onClose={onClose}
      aria-labelledby='invalidate-attachments-dialog'
      aria-describedby='invalidate-attachments-dialog'
    >
      <CDialogue
        title='Invalidar diagnóstico'
        confirmButtonLabel='Sim'
        cancelButtonLabel='Não'
        onConfirm={onRemove}
        onClose={onClose}
        description={
          <>
            Tem certeza que deseja <b>invalidar</b> esse <br /> diagnóstico?{' '}
          </>
        }
      />
    </Dialog>
  )
}

export default InvalidateCidDialog
