import { Box, Drawer } from '@mui/material'

type CDrawerFilterProps = {
  open: boolean
  onClose: () => void

  children?: React.ReactNode | React.ReactNode[]
}

export const CDrawerFilter = ({ open, onClose, children }: CDrawerFilterProps) => {
  return (
    <Drawer anchor='right' open={open} onClose={onClose}>
      <Box p={3}>
        <Box mb={2} display='flex' flexDirection='column' gap={2}>
          {children}
        </Box>
      </Box>
    </Drawer>
  )
}
