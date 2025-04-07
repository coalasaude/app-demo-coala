import { Box, Typography } from '@mui/material'

import { UsersInCallModelType } from '@/v3/domain/@v2/appointment/appointment-browse-data.model'
import { CAvatar, CTooltip } from '@/v3/presentation/newComponents'
import useMediaQuery from '@/hooks/useMediaQuery'

interface AttendingUsersProps {
  users: UsersInCallModelType[]
}

export const AttendingUsers = ({ users }: AttendingUsersProps) => {
  const isSmallDevice = useMediaQuery('sm')
  const maxAvatars = isSmallDevice ? 5 : 10

  const medicalUsers = users.filter(
    (user) => user.profileName === 'Médico' || user.profileName === 'Enfermeiro',
  )
  const nonMedicalUsers = users.filter(
    (user) => user.profileName !== 'Médico' && user.profileName !== 'Enfermeiro',
  )
  const hasDivision = medicalUsers.length > 0 && nonMedicalUsers.length > 0

  const displayedMedicalUsers = medicalUsers.slice(0, Math.min(medicalUsers.length, maxAvatars))
  const displayedNonMedicalUsers = nonMedicalUsers.slice(
    0,
    Math.max(0, maxAvatars - displayedMedicalUsers.length),
  )
  const totalDisplayed = displayedMedicalUsers.length + displayedNonMedicalUsers.length
  const hasMoreUsers = totalDisplayed < users.length

  const tooltipDescription = (
    <Box px={1} my={-1}>
      {users.map((user) => (
        <>
          <p>
            {user.fullName} / {user.profileName ? `${user.profileName} (a)` : 'Responsável'}
          </p>
        </>
      ))}
    </Box>
  )

  const renderUserAvatar = (user: UsersInCallModelType) => {
    const splitLetters = user.fullName.split(' ').map((name) => name[0])
    const initials = `${splitLetters[0]}${splitLetters[splitLetters.length - 1]}`
    return (
      <Box key={user.id} sx={{ pr: 1, ':last-child': { pr: 0 } }}>
        <CAvatar
          imageUrl={user.imageUrl}
          type='photo'
          size='medium'
          photoFallback='initials'
          name={initials}
        />
      </Box>
    )
  }

  return (
    <>
      {users.length > 0 ? (
        <CTooltip description={tooltipDescription} placement='bottom'>
          <Box display='flex' alignItems='center' width='fit-content'>
            {displayedMedicalUsers.map(renderUserAvatar)}
            {hasDivision && (
              <Typography variant='h3' mr={1}>
                |
              </Typography>
            )}
            {displayedNonMedicalUsers.map(renderUserAvatar)}
            {hasMoreUsers && (
              <Typography variant='h3' sx={{ mx: 1 }}>
                ...
              </Typography>
            )}
          </Box>
        </CTooltip>
      ) : (
        '-'
      )}
    </>
  )
}
