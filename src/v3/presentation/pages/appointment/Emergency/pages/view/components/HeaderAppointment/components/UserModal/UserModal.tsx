import { Box, Dialog, Menu } from '@mui/material'

import { useBreakpoint } from '@/hooks/useBreakpoints'

import { UserForm } from '../UserForm'

interface IModal {
  onClose: () => void
  id: number
  isOpen: boolean
  anchorEl: HTMLElement | null
}

export const UserModal = ({ id, onClose, isOpen, anchorEl }: IModal) => {
  const isMobile = useBreakpoint('sm')

  if (isMobile) {
    return (
      <Dialog open={!!isOpen} onClose={onClose} fullScreen>
        <Box px={2}>
          <UserForm id={id} onClose={onClose} withDivider />
        </Box>
      </Dialog>
    )
  }

  return (
    <Menu open={isOpen} anchorEl={anchorEl} onClose={onClose} keepMounted autoFocus={false}>
      <Box minWidth={300} maxWidth={400} px={2}>
        <UserForm id={id} onClose={onClose} />
      </Box>
    </Menu>
  )
}
