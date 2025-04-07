import { useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { BoxProps } from '@mui/material'

import { Profile } from '@/v3/domain/Profile'

import { FormProfileSelect } from './FormProfileSelect'

export type FormProfileSelectFormProps = {
  profiles: Profile[]
  maxInputWidth?: BoxProps['maxWidth']
  disabledInstitutionInput?: boolean
}

export const FormProfileSelectForm = ({
  profiles,
  maxInputWidth,
  disabledInstitutionInput,
}: FormProfileSelectFormProps) => {
  const { watch, reset, setValue } = useFormContext()
  const lastInstitutionId = useRef<number | undefined>()

  const [institutionId, profileId] = watch(['institutionId', 'profileId'])

  const [profileOptions, setProfileOptions] = useState<{ value: number; label: string }[]>()

  useEffect(() => {
    if (institutionId === undefined && profileId) {
      setProfileOptions([{ value: 0, label: '' }])
      reset()
    } else {
      setProfileOptions(
        profiles?.map(({ id, name }) => ({
          value: id,
          label: name,
        })),
      )
    }
  }, [institutionId, profileId, profiles, reset])

  useEffect(() => {
    if (lastInstitutionId.current != undefined && lastInstitutionId.current != institutionId)
      setValue('profileId', undefined as any)
    lastInstitutionId.current = institutionId
  }, [institutionId, setValue])

  return (
    <FormProfileSelect
      disabledInstitutionInput={disabledInstitutionInput}
      maxInputWidth={maxInputWidth}
      institutionId={institutionId}
      profileOptions={profileOptions}
    />
  )
}
