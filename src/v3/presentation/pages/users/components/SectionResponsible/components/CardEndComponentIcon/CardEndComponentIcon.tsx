import { Box } from '@mui/material'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'

type CardEndComponentIconProps = {
  onDelete: (e: any, responsibleId?: number) => void
  responsibleId?: number
}

export const CardEndComponentIcon = ({ onDelete, responsibleId }: CardEndComponentIconProps) => {
  return (
    <Box width='100%' alignItems='center' display='flex' justifyContent='flex-end'>
      <DeleteOutlineOutlinedIcon
        sx={{
          mb: 1,
          color: 'var(--mui-palette-grey-500)',
          width: '38px',
          height: '38px',
          p: 1,
          ':hover': { background: 'var(--mui-palette-grey-200)', borderRadius: '50%' },
        }}
        onClick={(e) => onDelete(e, responsibleId)}
      />
    </Box>
  )
}
