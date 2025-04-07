import { Typography } from '@mui/material'

interface ProfileTypeProps {
  profileName?: string
}

export const ProfileType = ({ profileName }: ProfileTypeProps) => {
  return <Typography variant='body1'>{profileName ?? '-'}</Typography>
}
