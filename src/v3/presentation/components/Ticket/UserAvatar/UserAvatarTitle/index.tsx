import { Typography } from '@mui/material'

export const UserAvatarTitle = ({
  children,
  onClick,
}: {
  children: React.ReactNode
  onClick?: () => void
}) => {
  return (
    <Typography component='span' display='block' onClick={onClick} sx={{ cursor: 'pointer' }}>
      {children}
    </Typography>
  )
}
