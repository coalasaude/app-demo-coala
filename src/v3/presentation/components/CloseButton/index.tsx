import { Close } from '@mui/icons-material'
import { Box } from '@mui/material'

interface IModal {
  onClose: (isSuccess: boolean) => void
}

export const CloseButton = ({ onClose }: IModal) => {
  return (
    <Box
      onClick={() => onClose(false)}
      position='absolute'
      top={0}
      right={0}
      p={1}
      style={{ cursor: 'pointer' }}
      aria-label='Close'
    >
      <Close />
    </Box>
  )
}

export default CloseButton
