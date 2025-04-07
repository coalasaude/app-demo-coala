import { yupResolver } from '@hookform/resolvers/yup'
import { Alert } from '@mui/material'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import HistoryIcon from '@mui/icons-material/History'

import { CForm } from '@/components/Forms/Form'
import { NEW_ROUTES } from '@/constants/routes'
import { InstitutionConfig, InstitutionConfigEnum } from '@/constants/institutionConfig'
import CanStartAppointmentAlert from '@/containers/Appointment/Emergency/add/components/CanStartAppointmentAlert'
import { useFetchInstitution } from '@/v3/presentation/hooks/api/organizations/institution/useFetchInsitution'
import { usePageTimeCounter } from '@/v3/presentation/hooks/usePageTimeCounter'
import { CBaseContainer, PageHeader } from '@/v3/presentation/newComponents'
import CStepper from '@/v3/presentation/newComponents/layout/CStepper'
import { getDateFromHour } from '@/v3/utils/getDateFromHour'
import useMediaQuery from '@/hooks/useMediaQuery'
import { useIsAdminPermission } from '@/v3/presentation/contexts/permissions/hooks/useIsAdminPermission'

import {
  initialValues,
  schema,
} from '../../components/Appointment/FormAppointment/schema/add-schema'
import { DescriptionStep } from '../../components/Appointment/FormAppointment/steps/DescriptionStep'
import { InitialStep } from '../../components/Appointment/FormAppointment/steps/InitialStep'

import { AppointmentSteps, useAppointmentControlSteps } from './hooks/useAppointmentControl'

export const CreateAppointment = () => {
  const router = useRouter()
  const isAdmin = useIsAdminPermission()
  const { getCount } = usePageTimeCounter()
  const isMobile = useMediaQuery('sm')

  const { handleSubmit, control, getValues, formState, reset, setValue, watch, ...others } =
    useForm({
      defaultValues: {
        ...initialValues,
        institutionId: Number(router.query.institutionId) ?? null,
      },
      resolver: yupResolver(schema),
    })
  const institutionId = watch('institutionId')
  const { data: institution } = useFetchInstitution(institutionId as unknown as number)

  const { onEndStep, onNextStep, step, stepperRef, errorMessage, isPending, onGoBack } =
    useAppointmentControlSteps(getCount)

  const onSubmit = () => {
    const body = getValues()
    onEndStep(body)
  }

  const getInstitutionHours = () => {
    const hourConfig = institution?.institutionSettings?.find(
      (setting) => setting.name === InstitutionConfig.OPENING_HOURS,
    )
    let beginHourConfig = dayjs('07:00', 'H:mm')
    let endHourConfig = dayjs('19:00', 'H:mm')
    if (hourConfig?.value instanceof Array) {
      beginHourConfig = dayjs(getDateFromHour(hourConfig.value?.[0]))
      endHourConfig = dayjs(getDateFromHour(hourConfig.value?.[1]))
    }
    return { beginHourConfig, endHourConfig }
  }

  const { beginHourConfig, endHourConfig } = getInstitutionHours()
  const hasInstitutionLatePayment =
    institution?.getConfig(InstitutionConfigEnum.LATE_PAYMENT)?.value === true

  return (
    <>
      <PageHeader
        title='Solicitar atendimento'
        secondaryButtonProps={
          isAdmin
            ? {
                children: isMobile ? <HistoryIcon /> : 'Atendimento retroativo',
                ...(isMobile && { sx: { width: 36, minWidth: 0, px: 0 } }),
                notUsePortal: true,
                onClick: () => router.push(NEW_ROUTES.AUTHENTICATED.APPOINTMENT.RETROACTIVE.path),
              }
            : undefined
        }
      />
      {institution && (
        <CanStartAppointmentAlert beginHour={beginHourConfig} endHour={endHourConfig} />
      )}
      {errorMessage && (
        <Alert severity='error' variant='filled' sx={{ boxShadow: 'none' }}>
          {errorMessage}
        </Alert>
      )}
      {hasInstitutionLatePayment && (
        <Alert
          severity='warning'
          variant='filled'
          sx={{
            display: 'flex',
            alignItems: 'center',
            boxShadow: 'none',
          }}
        >
          Existem boleto(s) em aberto. Entre em contato com nossa equipe para regularizar.
        </Alert>
      )}

      <CForm
        form={{ handleSubmit, getValues, setValue, control, formState, reset, watch, ...others }}
        onSubmit={onSubmit}
        id='appointment-form'
      >
        <CBaseContainer
          noBorder
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <CStepper
            ref={stepperRef}
            activeStep={step}
            steps={['Dados iniciais', 'Descrição da solicitação', 'Atendimento']}
            connectorProps={{ minWidth: 170 }}
          >
            <InitialStep
              key={AppointmentSteps.INITIAL_DATA}
              onNextStep={onNextStep}
              disableButton={isPending}
            />

            <DescriptionStep
              key={AppointmentSteps.DESCRIPTION}
              error={errorMessage}
              disableButton={isPending}
              onEndStep={handleSubmit(onSubmit)}
              onGoBack={onGoBack}
            />
          </CStepper>
        </CBaseContainer>
      </CForm>
    </>
  )
}

export default CreateAppointment
