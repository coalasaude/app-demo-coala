import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Box } from '@mui/material'

import CreateUserInitSvg from '/public/assets/svg/User/Create/CreateUserInit.svg'

import { CForm } from '@/components/Forms'
import { StepContainer } from '@/v3/presentation/components/CWizard/StepContainer'
import { FormPageButtons } from '@/v3/presentation/components/FormButtons'
import { useCWizardUrlControlContext } from '@/v3/presentation/hooks/useCWizardUrlControl'
import { FormProfileSelectForm } from '@/v3/presentation/pages/users/components/FormProfileSelect'
import { useFetchUserProfiles } from '@/v3/presentation/hooks/useFetchUserProfiles'

import {
  IProfileFormFields,
  schemaProfile,
} from '../../../../../components/FormProfileSelect/schema'
import { BaseUserAddStepProps } from '../../../types'

export type ProfileStepProps = BaseUserAddStepProps & {
  initialInstitutionId?: number
}

export const ProfileStep = ({ onSetData, initialInstitutionId }: ProfileStepProps) => {
  const { nextStep } = useCWizardUrlControlContext()

  const { watch, reset, setValue, ...form } = useForm({
    resolver: yupResolver(schemaProfile),
    defaultValues: {
      institutionId: initialInstitutionId,
      profileId: undefined,
    },
  })

  const [institutionId] = watch(['institutionId'])

  const { data: profiles } = useFetchUserProfiles({ institutionId })

  const handleSubmit: SubmitHandler<IProfileFormFields> = async (body) => {
    const profile = profiles?.find((option) => option.id == body.profileId)

    onSetData?.({
      institutionId: body.institutionId,
      profileId: body.profileId,
      profile: { id: profile?.id, name: profile?.name, type: profile?.type },
    })
    nextStep?.()
  }

  return (
    <CForm id='myForm' form={{ watch, reset, setValue, ...form }} onSubmit={handleSubmit}>
      <StepContainer svg={CreateUserInitSvg} py={4}>
        <Box sx={{ width: ['100%', '30rem'] }}>
          <FormProfileSelectForm profiles={profiles || []} />
          <FormPageButtons
            mt={3}
            isLoading={false}
            justifyContent={['center', 'center', 'flex-end']}
            minWidth={['100%', '120px']}
            confirmLabel='Próximo'
          />
        </Box>
      </StepContainer>
    </CForm>
  )
}
