import { useMemo, useState } from 'react'
import { SxProps } from '@mui/material'

import { UserModel, UserModelConstructor } from '@/v3/domain/@v2/appointment/user.model'
import { removeAccents } from '@/v3/utils/remove-accents'
import { useFetchBrowseAppointmentHealthUsers } from '@/v3/presentation/hooks/api/@v2/appointment/user/useFetchBrowseHealthUsers'

import { UserSelectInputForm } from '../../FormAppointment/components'

type HealthUserSelectInputFormProps = {
  healthUser?: UserModelConstructor
  title: string
  sx?: SxProps
}

export const HealthUserSelectInputForm = ({
  healthUser,
  title,
  sx,
}: HealthUserSelectInputFormProps) => {
  const [searchName, setSearchName] = useState<string | undefined>()

  const { requesters, isLoading } = useFetchBrowseAppointmentHealthUsers({ searchName })

  const healthUsersData = useMemo(() => {
    const requestersData = requesters?.data
    const requesterAsUserModel = healthUser ? new UserModel(healthUser) : undefined

    if (requesterAsUserModel) requestersData?.push(requesterAsUserModel)

    return requestersData
  }, [healthUser, requesters?.data])

  return (
    <UserSelectInputForm
      name='professionalId'
      label={title}
      placeholder='Selecione o profissional de saúde'
      sx={{ ...sx }}
      isLoading={isLoading}
      users={healthUsersData}
      onSearch={(value) => setSearchName(removeAccents(value))}
    />
  )
}
