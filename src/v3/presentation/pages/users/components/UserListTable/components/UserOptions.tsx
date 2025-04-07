import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined'
import { Box, Typography } from '@mui/material'

import { CMenu } from '@/v3/presentation/newComponents'

interface UserOptionsProps {
  handleNotify: () => void
  handleDelete: () => void
  isPendingAccess?: boolean
}

const UserOptions = ({ handleDelete, handleNotify, isPendingAccess }: UserOptionsProps) => {
  const menuItems = [
    {
      children: (
        <Box display='flex' alignItems='center' width='100%' gap={2} onClick={handleNotify}>
          <Typography variant='body2'>Enviar Notificações</Typography>
        </Box>
      ),
    },
    {
      children: (
        <Box display='flex' alignItems='center' width='100%' gap={2} onClick={handleDelete}>
          <Typography variant='body2'>Excluir</Typography>
        </Box>
      ),
    },
  ]
  if (!isPendingAccess) {
    menuItems.splice(0, 1)
  }

  return (
    <CMenu actionComponent={<MoreVertOutlinedIcon sx={{ fontSize: '20px' }} />} items={menuItems} />
  )
}

export default UserOptions
