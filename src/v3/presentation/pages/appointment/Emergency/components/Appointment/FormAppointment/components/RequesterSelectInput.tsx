import { useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { SxProps } from '@mui/material'

import { useFetchBrowseAppointmentRequesters } from '@/v3/presentation/hooks/api/@v2/appointment/user/useFetchBrowseRequesters'
import { UserModel } from '@/v3/domain/@v2/appointment/user.model'
import { AppointmentReadDataModel } from '@/v3/domain/@v2/appointment/appointment-read-data.model'
import { removeAccents } from '@/v3/utils/remove-accents'

import { UserSelectInputForm } from './UserSelectInputForm'

type RequesterSelectInputFormProps = {
  requester?: AppointmentReadDataModel['requestedUser']
  disabled: boolean
  title: string
  sx?: SxProps
}

export const RequesterSelectInputForm = ({
  requester,
  disabled,
  title,
  sx,
}: RequesterSelectInputFormProps) => {
  const form = useFormContext()
  const institutionId = form.watch('institutionId')

  const [searchName, setSearchName] = useState<string | undefined>()

  const { requesters, isLoading } = useFetchBrowseAppointmentRequesters({
    institutionId: institutionId,
    searchName,
    limit: 10,
  })

  const requestersData = useMemo(() => {
    const requestersData = requesters?.data
    const requesterAsUserModel = requester ? new UserModel(requester) : undefined

    if (requesterAsUserModel) requestersData?.push(requesterAsUserModel)

    return requestersData
  }, [requester, requesters?.data])

  return (
    <UserSelectInputForm
      name='requestedUserId'
      label={title}
      placeholder='Digite o nome de quem está solicitando'
      sx={{ ...sx }}
      disabled={disabled}
      isLoading={isLoading}
      users={requestersData}
      onSearch={(value) => setSearchName(removeAccents(value))}
    />
  )
}
