import { Box, Typography } from '@mui/material'
import dayjs from 'dayjs'
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined'
import StarsIcon from '@mui/icons-material/Stars'

import { AppointmentStatus } from '@/v3/domain/Appointment'
import { CardContent } from '@/v3/presentation/components/Cards/CardContent'
import { CAvatar, CDisplayRecord, CDivider } from '@/v3/presentation/newComponents'
import { AppointmentBrowseDataModel } from '@/v3/domain/@v2/appointment/appointment-browse-data.model'
import { AppointmentFinishedStatusDescriptionMobile } from '@/constants/appointment'
import { AppointmentStatusDescriptionMobile } from '@/constants/status'

import { getAppointmentStatusColor } from '../../../utils/getAppointmentStatusColor'

interface AppointmentListCardProps {
  appointment: AppointmentBrowseDataModel
  canView?: boolean
  handleClick: () => void
}

const AppointmentListCard = ({ canView, handleClick, appointment }: AppointmentListCardProps) => {
  const fullName = appointment.patient?.fullName
    ? appointment.patient.fullName
    : 'Paciente não definido'

  const statusTitle =
    appointment.status === AppointmentStatus.FINISHED
      ? AppointmentFinishedStatusDescriptionMobile[appointment.finishedReason || '']
      : AppointmentStatusDescriptionMobile[appointment.status || '']

  const statusBgColor = getAppointmentStatusColor(appointment.status || AppointmentStatus.FINISHED)

  return (
    <CardContent
      sx={{
        p: 2,
        backgroundColor: '#FFFF',
        cursor: 'pointer',
        width: '100%',
        position: 'relative',
        opacity: appointment.isFinishedRow ? 0.6 : 1.0,
      }}
      onClick={canView ? () => handleClick() : undefined}
    >
      <Box display='flex' alignItems='center' width='100%' gap={1}>
        <CAvatar size='large' type='photo' imageUrl={appointment?.patient?.imageUrl} />
        <Box width='100%'>
          <Typography
            variant='h4'
            sx={{
              maxWidth: '60%',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            }}
          >
            {fullName}
          </Typography>
          <Box overflow='hidden' display='flex' gap={1}>
            <Typography variant='caption' color='var(--mui-palette-grey-500)'>
              {appointment.patient?.profileName}
            </Typography>
            <EventNoteOutlinedIcon
              sx={{ fill: 'var(--mui-palette-grey-500)', width: 10, height: 10, mt: 0.5 }}
            />
            <Typography variant='caption'>
              {dayjs(appointment.createdAt).format('DD/MM/YYYY | HH:mm')}
            </Typography>
            {appointment.institution.isNew && (
              <StarsIcon
                sx={{
                  color: 'var(--mui-palette-primary-main)',
                  fontSize: 'inherit',
                  mb: 0.2,
                }}
              />
            )}
          </Box>
        </Box>
      </Box>

      <Box
        bgcolor={`var(${statusBgColor})`}
        color={'white'}
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          borderTopRightRadius: 6,
          borderBottomLeftRadius: 6,
          py: 0.5,
          px: 1,
          maxWidth: '30%',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        }}
      >
        <Typography variant='caption' color='white'>
          {statusTitle}
        </Typography>
      </Box>

      <CDivider sx={{ my: 1 }} />

      <Box overflow='hidden' mr={1}>
        <CDisplayRecord
          label='Queixa'
          value={appointment.resume}
          withDivider={false}
          valueProps={{ variant: 'body1' }}
          noWrap
        />
      </Box>
    </CardContent>
  )
}

export default AppointmentListCard
