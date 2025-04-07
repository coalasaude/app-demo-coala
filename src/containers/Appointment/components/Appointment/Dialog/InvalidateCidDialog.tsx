import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'

import { useLazyFetch } from '@/hooks/useFetch'
import { useLayout } from '@/hooks/useLayout'

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

  const onRemove = async () => {
    const { error } = await apiRequest({
      path: `appointments/${appointmentId}/cid/${id}`,
      method: 'DELETE',
      pathParams: { id },
    })

    if (!error) {
      showSnackBar({
        message: 'CID invalidado com sucesso',
        type: 'success',
      })
      onSuccess()
      onClose()
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
      <DialogTitle>Remover CID</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <span id='invalidate-attachments-dialog'>
            Você tem certeza que deseja remover este CID?
          </span>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} autoFocus>
          Cancelar
        </Button>
        <Button onClick={onRemove} color='error'>
          Remover
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default InvalidateCidDialog
