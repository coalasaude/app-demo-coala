import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { Typography } from '@mui/material'

import { StyledDeleteWrapper } from './style'

export const DeleteIconButton = ({
  onDelete,
  mt,
  label = 'Excluir',
}: {
  onDelete: () => void
  mt?: number
  label?: string
}) => {
  return (
    <StyledDeleteWrapper sx={{ mt }} onClick={() => onDelete()}>
      <DeleteOutlineOutlinedIcon />
      <Typography variant='h6' component='span'>
        {label}
      </Typography>
    </StyledDeleteWrapper>
  )
}
