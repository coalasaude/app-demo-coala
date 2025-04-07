import { Box } from '@mui/material'

import { AppointmentBrowseDataModel } from '@/v3/domain/@v2/appointment/appointment-browse-data.model'
import { NotFound } from '@/v3/presentation/components/NotFound'
import CPagination from '@/v3/presentation/newComponents/molecules/CPagination'
import { limit as limitDefault } from '@/constants/api'
import { CardListSkeleton } from '@/components/Skeletons/CardListSkeleton'

import AppointmentListCard from './AppointmentListCard/AppointmentListCard'

interface AppointmentListMobileProps {
  appointments?: AppointmentBrowseDataModel[]
  onClickRow?: (id: number) => void
  canManageAppointment: boolean
  isLoading: boolean
  onChangePage?: (page: number, offset: number) => void
  limit?: number
  offset?: number
  count?: number
}

const AppointmentListMobile = ({
  appointments,
  onClickRow,
  canManageAppointment,
  isLoading,
  onChangePage,
  limit = limitDefault,
  offset = 0,
  count = 0,
}: AppointmentListMobileProps) => {
  if (isLoading) return <CardListSkeleton />

  return appointments?.length === 0 && !isLoading ? (
    <NotFound />
  ) : (
    <>
      {appointments?.map((appointment) => (
        <AppointmentListCard
          key={appointment.id}
          appointment={appointment}
          handleClick={() => onClickRow?.(appointment.id)}
          canView={canManageAppointment}
        />
      ))}
      <Box p={2} pt={0} mb={3}>
        {Boolean(appointments?.length) && (
          <CPagination
            count={Math.ceil(count / limit)}
            page={Math.ceil(offset / limit + 1)}
            totalCount={count}
            onChange={(_, page) => onChangePage?.(page, (page - 1) * limit)}
            siblingCount={0}
          />
        )}
      </Box>
    </>
  )
}

export default AppointmentListMobile
