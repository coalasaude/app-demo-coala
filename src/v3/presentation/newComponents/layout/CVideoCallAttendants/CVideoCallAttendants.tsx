import { Box } from '@mui/material'

import { UsersInCallModelType } from '@/v3/domain/@v2/appointment/appointment-browse-data.model'

import { CAvatar, CTooltip } from '../../atoms'

export type Props = {
  user: UsersInCallModelType
}

export const CVideoCallAttendants = ({ user }: Props) => {
  const splitLetters = user?.fullName?.split(' ').map((name) => name[0])
  const firstAndLastLettersInName = `${splitLetters[0]}${splitLetters[splitLetters.length - 1]}`
  const userProfileName = user?.profileName ? `${user?.profileName} (a)` : 'Responsável'

  return (
    <CTooltip
      description={
        <span>
          {user?.fullName} /<br />
          {userProfileName}
        </span>
      }
    >
      <Box sx={{ pr: 1, ':last-child': { pr: 0 } }}>
        <CAvatar
          imageUrl={user.imageUrl}
          type='photo'
          size='medium'
          photoFallback='initials'
          name={firstAndLastLettersInName}
        />
      </Box>
    </CTooltip>
  )
}

export default CVideoCallAttendants
