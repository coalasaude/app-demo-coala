import { Box } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { useEffect, useMemo } from 'react'

import { Profile } from '@/v3/domain/Profile'

import { FormProfileSelectForm } from '../FormProfileSelect'

import { FormProfileData } from './FormProfileData'

export type FormProfileSelectProps = {
  profiles: Profile[]
  disabledInstitutionInput?: boolean
}

export const FormProfileForm = ({ profiles, disabledInstitutionInput }: FormProfileSelectProps) => {
  const { watch, setValue } = useFormContext()

  const [profileId, educationalStageId] = watch(['profileId', 'educationalStageId'])

  const profile = useMemo(() => profiles?.find(({ id }) => profileId == id), [profileId, profiles])

  useEffect(() => {
    if (!profileId) {
      setValue('isMedicalProfile', undefined as any)
    } else {
      setValue('isMedicalProfile', Profile.getIsMedicalByProfileType(profile?.type))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileId, setValue])

  return (
    <Box sx={{ width: ['100%', '30rem'] }}>
      <FormProfileSelectForm
        disabledInstitutionInput={disabledInstitutionInput}
        profiles={profiles || []}
        maxInputWidth={[undefined, 480]}
      />
      <FormProfileData
        mt={3}
        profile={profile}
        maxInputWidth={[undefined, 480]}
        disabledSchoolGradeInput={!educationalStageId}
        educationalStageId={educationalStageId}
        onEducationalInputChange={() => setValue('schoolGradeId', undefined as any)}
      />
    </Box>
  )
}
