import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined'
import { Box, Typography } from '@mui/material'

import { CMenu } from '@/v3/presentation/newComponents'

interface CommentOptionsProps {
  handleEdit: () => void
  handleDelete: () => void
}

const CommentOptions = ({ handleDelete, handleEdit }: CommentOptionsProps) => {
  return (
    <CMenu
      actionComponent={
        <MoreVertOutlinedIcon
          sx={{
            color: 'var(--mui-palette-grey-500)',
            width: 16,
            height: 16,
            zIndex: 999,
            cursor: 'pointer',
          }}
        />
      }
      items={[
        {
          children: (
            <Box display='flex' alignItems='center' width='100%' gap={2} onClick={handleEdit}>
              <Typography variant='body2'>Editar</Typography>
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
      ]}
    />
  )
}

export default CommentOptions
