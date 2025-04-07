import { Modal, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import Button from '@/v3/presentation/components/Button'
import ButtonIcon from '@/v3/presentation/components/ButtonIcon'
import {
  Container,
  CardHeader,
  CardActions,
} from '@/v3/presentation/pages/health-unit/pages/view/components/Modal/styles'

type Props = {
  open: boolean
  handleClose: () => void
  handleConfirm: () => void | ((id: number) => void)
  title?: string
}

export const HealthUnitModal = ({ open, handleClose, handleConfirm, title }: Props) => {
  return (
    <Modal open={open}>
      <Container>
        <CardHeader>
          <Typography variant='h3'>
            {title ? title : 'Realmente deseja remover esse vínculo?'}
          </Typography>

          <ButtonIcon icon={<CloseIcon sx={{ width: 20, height: 20 }} />} onClick={handleClose} />
        </CardHeader>

        <CardActions>
          <Button variant='text' onClick={handleClose}>
            Cancelar
          </Button>

          <Button onClick={handleConfirm}>Continuar</Button>
        </CardActions>
      </Container>
    </Modal>
  )
}
