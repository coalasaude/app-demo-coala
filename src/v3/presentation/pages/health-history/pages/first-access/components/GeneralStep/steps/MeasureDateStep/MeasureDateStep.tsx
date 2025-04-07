import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { SubmitHandler, useForm } from 'react-hook-form'

import { CDatePickerControlled, CForm } from '@/components/Forms'
import { GridItem, GridWrapper } from '@/components/Grid'
import { UserModel } from '@/v3/domain/@v2/users/users.model'
import { CBaseContainer } from '@/v3/presentation/components/CBaseContainer'
import { StepContainerInfo } from '@/v3/presentation/components/CWizard/StepContainer/StepContainerInfo'
import { useMutateAddBodyMass } from '@/v3/presentation/hooks/api/@v2/health-history/body-mass/useMutateAddBodyMass'
import { useAuth } from '@/v3/presentation/hooks/useAuth'
import { useLoadingFeedback } from '@/v3/presentation/hooks/useLoadingFeedback'
import { useFieldArrayForm } from '@/v3/presentation/pages/health-history/pages/first-access/hooks/useFieldArrayForm'

import { IMeasureFormFields, measureInitialValues, schemaMeasure } from './schema'

export interface FormStepProps {
  user: UserModel
  onConfirm: () => Promise<void>
  height: number
  weight: number
}

export const MeasureDateStep = ({ onConfirm, user, height, weight }: FormStepProps) => {
  const { execute, isLoading } = useLoadingFeedback(onConfirm)
  const userId = user.id
  const { auth } = useAuth()
  const form = useForm({
    resolver: yupResolver(schemaMeasure),
    defaultValues: measureInitialValues,
  })
  useFieldArrayForm({
    prefixName: 'measureData',
    form,
  })
  const { mutateAsync: createMutateBodyMass } = useMutateAddBodyMass()

  const handleSubmit: SubmitHandler<IMeasureFormFields> = async ({ measurementDate }) => {
    if (user.id && height && weight && measurementDate) {
      await createMutateBodyMass({
        userId: user.id,
        height,
        weight,
        measurementDate,
      })
    }
    await execute()
  }

  const copy =
    auth?.userId === userId
      ? 'Qual é a data de sua última medição de altura e peso?'
      : `Qual é a data da última medição e peso d${user.getGenreArticle()} ${user.name}?`

  return (
    <CForm id={'myForm'} form={form} onSubmit={handleSubmit}>
      <CBaseContainer boxShadow='none' isLoading={isLoading} buttonLabel='Próximo' mt={4}>
        <GridWrapper display='flex' justifyContent='center'>
          <GridItem xs={12} md={4}>
            <Typography variant='h4' mb={1} textAlign='center'>
              {copy}
            </Typography>
            <CDatePickerControlled
              name='measurementDate'
              label='Data da medição*'
              maxDate={dayjs()}
            />
          </GridItem>
        </GridWrapper>
        <Box display='flex' justifyContent='center'>
          <StepContainerInfo mt={4}>
            Não é necessário uma data exata, pode ser uma data próxima.
          </StepContainerInfo>
        </Box>
      </CBaseContainer>
    </CForm>
  )
}
