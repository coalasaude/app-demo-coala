import { Modal as MModal, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import Button from '@/v3/presentation/components/Button'
import ButtonIcon from '@/v3/presentation/components/ButtonIcon'

import { CardActions, CardBody, CardHeader, Container } from './styles'

type Props = {
  open: boolean
  handleClose: () => void
  handleConfirm: () => void | ((id: number) => void)
  title?: string
  subtitle?: string
}

export const Modal = ({ open, handleClose, handleConfirm, title, subtitle }: Props) => {
  return (
    <MModal open={open}>
      <Container>
        <CardHeader>
          <Typography variant='h3'>{title ? title : 'Deseja inativar esta unidade?'}</Typography>

          <ButtonIcon icon={<CloseIcon sx={{ width: 20, height: 20 }} />} onClick={handleClose} />
        </CardHeader>

        <CardBody>
          <Typography variant='body1'>
            {subtitle
              ? subtitle
              : 'Esta ação não permitirá que a unidade seja vinculada a novas instituições e os vínculos atuais serão perdidos.'}
          </Typography>
        </CardBody>

        <CardActions>
          <Button variant='text' onClick={handleClose}>
            Cancelar
          </Button>

          <Button onClick={handleConfirm}>Continuar</Button>
        </CardActions>
      </Container>
    </MModal>
  )
}
