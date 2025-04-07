import { yupResolver } from '@hookform/resolvers/yup'
import { Alert } from '@mui/material'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import { CForm } from '@/components/Forms/Form'
import { CBaseContainer, PageHeader } from '@/v3/presentation/newComponents'
import CStepper from '@/v3/presentation/newComponents/layout/CStepper'

import { DescriptionStep } from '../../components/Appointment/FormRetroactiveAppointment/steps/DescriptionStep'
import { InitialStep } from '../../components/Appointment/FormRetroactiveAppointment/steps/InitialStep'
import {
  initialValues,
  schema,
} from '../../components/Appointment/FormRetroactiveAppointment/schema/add-retroactive-schema'

import {
  RetroactiveAppointmentSteps,
  useRetroactiveAppointmentControlSteps,
} from './hooks/useRetroactiveAppointmentControl'

export const CreateAppointment = () => {
  const router = useRouter()

  const form = useForm({
    defaultValues: {
      ...initialValues,
      institutionId: Number(router.query.institutionId) ?? null,
    },
    resolver: yupResolver(schema),
  })

  const { onEndStep, onNextStep, step, stepperRef, errorMessage, isPending, onGoBack } =
    useRetroactiveAppointmentControlSteps()

  const onSubmit = () => {
    const body = form.getValues()
    onEndStep(body)
  }

  return (
    <>
      <PageHeader title='Criar atendimento retroativo' />
      {errorMessage && (
        <Alert severity='error' variant='filled' sx={{ boxShadow: 'none' }}>
          {errorMessage}
        </Alert>
      )}

      <CForm form={form} onSubmit={onSubmit} id='retroactive-appointment-form'>
        <CBaseContainer
          noBorder
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <CStepper
            ref={stepperRef}
            activeStep={step}
            steps={['Dados iniciais da solicitação', 'Sobre o atendimento']}
            connectorProps={{ minWidth: 170 }}
          >
            <InitialStep
              key={RetroactiveAppointmentSteps.INITIAL_DATA}
              onNextStep={onNextStep}
              disableButton={isPending}
            />

            <DescriptionStep
              key={RetroactiveAppointmentSteps.DESCRIPTION}
              error={errorMessage}
              disableButton={isPending}
              onEndStep={form.handleSubmit(onSubmit)}
              onGoBack={onGoBack}
            />
          </CStepper>
        </CBaseContainer>
      </CForm>
    </>
  )
}

export default CreateAppointment
