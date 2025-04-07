import CloseIcon from '@mui/icons-material/Close'
import { BoxProps, SxProps, Typography } from '@mui/material'

import useMediaQuery from '@/hooks/useMediaQuery'

import {
  StyledCloseButton,
  StyledIcon,
  StyledModalCard,
  StyledModalContent,
  StyledModalHeader,
} from '../styles'
import { useModalContext } from '../context/ModalProvider'

export interface IModalCardProps {
  children?: React.ReactNode
  icon?: React.ReactNode
  title?: React.ReactNode
  onClose?: () => void
  sx?: SxProps
  hideCloseButton?: boolean
  innerBoxProps?: BoxProps
}

export const ModalCard: React.FC<IModalCardProps> = ({
  children,
  onClose,
  icon,
  sx,
  hideCloseButton,
  title,
  innerBoxProps,
}) => {
  const { handleModal, isQuiet } = useModalContext()
  const isMobile = useMediaQuery('sm')

  const handleClose = () => {
    if (onClose) {
      onClose()
    } else {
      handleModal()
    }
  }

  return (
    <StyledModalCard isMobile={isMobile} isQuiet={isQuiet} maxWidth='100%' sx={sx}>
      {!!title && <Typography variant='h1'>{title}</Typography>}
      {!hideCloseButton && (
        <StyledCloseButton onClick={handleClose}>
          <CloseIcon />
        </StyledCloseButton>
      )}
      {icon && (
        <StyledModalHeader>
          <StyledIcon>{icon}</StyledIcon>
        </StyledModalHeader>
      )}
      <StyledModalContent {...innerBoxProps}>{children}</StyledModalContent>
    </StyledModalCard>
  )
}
