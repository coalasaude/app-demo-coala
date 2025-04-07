import { useFormContext } from 'react-hook-form'
import { useState } from 'react'

import { useFetchBrowseAppointmentPatients } from '@/v3/presentation/hooks/api/@v2/appointment/user/useFetchBrowsePatients'
import { removeAccents } from '@/v3/utils/remove-accents'

import { IUserSelectInputForm, UserSelectInputForm } from './UserSelectInputForm'

interface PatientSelectInputFormProps extends Partial<IUserSelectInputForm> {
  disabled: boolean
  title: string
}

export const PatientSelectInputForm = ({
  disabled,
  title,
  ...props
}: PatientSelectInputFormProps) => {
  const form = useFormContext()
  const institutionId = form.watch('institutionId')

  const [searchName, setSearchName] = useState<string | undefined>()

  const { patients, isLoading } = useFetchBrowseAppointmentPatients({
    institutionId: institutionId,
    searchName,
    limit: 10,
  })

  return (
    <UserSelectInputForm
      {...props}
      name='patientId'
      label={title}
      placeholder='Digite o nome do paciente'
      disabled={disabled}
      isLoading={isLoading}
      users={patients?.data}
      onSearch={(value) => setSearchName(removeAccents(value))}
    />
  )
}
