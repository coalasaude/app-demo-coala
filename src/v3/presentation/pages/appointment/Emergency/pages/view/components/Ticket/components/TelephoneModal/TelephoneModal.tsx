import { Box, Dialog, Menu } from '@mui/material'

import { useBreakpoint } from '@/hooks/useBreakpoints'

import { TelephoneForm } from '../TelephoneForm/TelephoneForm'

interface IModal {
  onClose: () => void
  id: number
  isOpen: boolean
  anchorEl: HTMLElement | null
}

export const TelephoneModal = ({ id, onClose, isOpen, anchorEl }: IModal) => {
  const isMobile = useBreakpoint('sm')

  if (isMobile) {
    return (
      <Dialog open={!!isOpen} onClose={onClose} fullScreen>
        <TelephoneForm id={id} onClose={onClose} withDivider />
      </Dialog>
    )
  }

  return (
    <Menu
      open={isOpen}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <Box minWidth={400}>
        <TelephoneForm id={id} onClose={onClose} />
      </Box>
    </Menu>
  )
}
