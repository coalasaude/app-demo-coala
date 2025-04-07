import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { Box } from '@mui/system'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { RecordsPath } from '@/types/records'
import { bindPathParams } from '@/utils/bindParams'
import { NEW_ROUTES } from '@/constants/routes'
import CloseButton from '@/v3/presentation/components/CloseButton'
import { WebViewManager } from '@/services/WebView'

import PathForm from './components/PathForm'

interface IModal {
  open?: boolean
  onClose: (isSuccess: boolean) => void
  appointmentId?: number
}

export const RecordsModal = ({ open, onClose, appointmentId }: IModal) => {
  const router = useRouter()
  const [path, setPath] = useState<RecordsPath>(RecordsPath.MEDICAL_RECORD)

  const onSubmit = async (body: RecordsPath) => {
    const selectedRoute = NEW_ROUTES.AUTHENTICATED.APPOINTMENT[body]

    if (selectedRoute) {
      const routePath = selectedRoute.path.replace('[id]', String(router.query.id))
      const bindedPath = bindPathParams(routePath, { id: String(appointmentId || router.query.id) })
      const isCallPresent = router.pathname.includes('call')
      if (isCallPresent) {
        WebViewManager.open(bindedPath)
      } else {
        router.push(bindedPath)
      }
      onClose(true)
    }
  }

  return (
    <Dialog
      open={!!open}
      onClose={() => onClose(false)}
      aria-labelledby='change-status-dialog'
      aria-describedby='change-status-description'
    >
      <Box py={2} px={6} position='relative'>
        <CloseButton onClose={onClose} />
        <DialogTitle variant='h5'>Selecione o tipo de registro</DialogTitle>
        <DialogContent>
          <Box mt={1}>
            <PathForm setPath={setPath} />
          </Box>
        </DialogContent>
        <DialogActions sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
          <Button variant='contained' size='small' onClick={() => onSubmit(path)} fullWidth>
            Criar registro
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  )
}

export default RecordsModal
