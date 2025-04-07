import { Box, Typography } from '@mui/material'

import { UsersInCallModelType } from '@/v3/domain/@v2/appointment/appointment-browse-data.model'
import { CVideoCallAttendants } from '@/v3/presentation/newComponents/layout/CVideoCallAttendants'

interface AttendingUsersProps {
  users: UsersInCallModelType[]
}

export const AttendingUsers = ({ users }: AttendingUsersProps) => {
  const medicalUsers = users.filter(
    (user) => user.profileName === 'Médico' || user.profileName === 'Enfermeiro',
  )
  const nonMedicalUsers = users.filter(
    (user) => user.profileName !== 'Médico' && user.profileName !== 'Enfermeiro',
  )

  return (
    <>
      {users.length > 0 ? (
        <Box display='flex' alignItems='center'>
          {medicalUsers.map((user) => (
            <CVideoCallAttendants key={user.id} user={user} />
          ))}
          {medicalUsers.length > 0 && nonMedicalUsers.length > 0 && (
            <Typography variant='h3' mr={1}>
              |
            </Typography>
          )}
          {nonMedicalUsers.map((user) => (
            <CVideoCallAttendants key={user.id} user={user} />
          ))}
        </Box>
      ) : (
        '-'
      )}
    </>
  )
}
