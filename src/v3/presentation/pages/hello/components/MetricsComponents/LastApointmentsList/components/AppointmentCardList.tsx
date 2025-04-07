import { Box, Typography } from '@mui/material'
import { useRouter } from 'next/router'

import { NEW_ROUTES } from '@/constants/routes'
import { bindPathParams } from '@/utils/bindParams'
import { LastAppointmentsModel } from '@/v3/domain/@v2/dashboard/last-appointments.model'
import { CAvatar } from '@/v3/presentation/newComponents'
import { NotFound } from '@/v3/presentation/components/NotFound'

type Props = {
  person: LastAppointmentsModel[]
}
export const AppointmentCardList = ({ person }: Props) => {
  const router = useRouter()
  const handleClick = (id: number) => {
    router.push(
      bindPathParams(NEW_ROUTES.AUTHENTICATED.APPOINTMENT.VIEW.path, {
        id: String(id),
      }),
    )
  }

  return (
    <Box display='flex' flexDirection='column' gap={2}>
      {person?.slice(0, 2).map(({ date, name, profile: profileName, id }) => {
        return (
          <Box
            key={id}
            onClick={() => handleClick(id)}
            sx={{
              backgroundColor: 'var(--mui-palette-grey-100)',
              cursor: 'pointer',
              borderRadius: 1,
              display: 'flex',
              flexDirection: 'column',
              p: 1,
            }}
          >
            <Box pr={1} display='flex' alignItems='center' justifyContent='space-between'>
              <Box display='flex' alignItems='center' mr={2}>
                <CAvatar name={name} size='large' type='initials' />
                <Box
                  display='flex'
                  justifyContent='center'
                  height='100%'
                  flexDirection='column'
                  ml={2}
                >
                  <Typography
                    variant='h5'
                    whiteSpace='nowrap'
                    overflow='hidden'
                    textOverflow='ellipsis'
                    maxWidth={[142, 192, 192, 320, 500]}
                  >
                    {name}
                  </Typography>
                  <Typography variant='body2' color='var(--mui-palette-grey-700)'>
                    {profileName}
                  </Typography>
                </Box>
              </Box>
              <Box display='flex' alignItems='center' justifyContent='center' height='100%'>
                <Typography variant='body2' textAlign='right' whiteSpace='pre-line'>
                  Solicitação{'\n'}
                  {date}
                </Typography>
              </Box>
            </Box>
          </Box>
        )
      })}
      {person.length == 0 && (
        <Box mt={0}>
          <NotFound text='Nenhum atendimento registrado' />
        </Box>
      )}
    </Box>
  )
}
