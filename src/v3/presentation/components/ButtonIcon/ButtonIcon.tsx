import { IconButton, IconButtonProps } from '@mui/material'
import { MouseEventHandler } from 'react'

export const ButtonIcon = ({
  icon,
  onClick,
  sx,
}: {
  icon: React.ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement>
  sx?: IconButtonProps['sx']
}) => (
  <IconButton sx={sx} onClick={onClick}>
    {icon}
  </IconButton>
)
