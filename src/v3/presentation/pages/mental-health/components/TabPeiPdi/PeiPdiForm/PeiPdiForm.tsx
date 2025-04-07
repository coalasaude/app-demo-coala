import { Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { usePostHog } from 'posthog-js/react'
import dayjs from 'dayjs'

import { UserModel } from '@/v3/domain/@v2/users/users.model'
import CStepper from '@/v3/presentation/newComponents/layout/CStepper'
import { CForm } from '@/components/Forms'
import { CalendarSettingsDays, FrequencyInterval } from '@/constants/mentalHealth'
import { BrowsePeiPdi } from '@/v3/domain/@v2/mental-health/learning'
import { useMutateUpdatePeiPdi } from '@/v3/presentation/hooks/api/@v2/mental-health/useMutateUpdatePeiPdi'
import { useModalContext } from '@/v3/presentation/components/Modal'
import { usePageTimeCounter } from '@/v3/presentation/hooks/usePageTimeCounter'
import {
  POSTHOG_ACTIONS,
  POSTHOG_EVENTS,
  buildPath,
} from '@/v3/presentation/constants/posthog-events.constants'
import { onlyNumsNormalizer } from '@/components/Forms/normalizers/onlyNumsNormalizer'

import { CreatePeiPdiSteps, useCreatePeiPdiControl } from '../../../hooks/useCreatePeiPdiControl'

import FormDefinitionStep from './FormDefinitionStep/FormDefinitionStep'
import FormGoalsStep from './FormGoalsStep/FormGoalsStep'
import { PeiPdiSchema } from './schema'

interface PeiPdiFormProps {
  user: UserModel
  peiPdi?: BrowsePeiPdi
  isEdit?: boolean
  canCreateAi: boolean
}

const PeiPdiForm = ({ user, peiPdi, isEdit, canCreateAi }: PeiPdiFormProps) => {
  const { stepperRef, step, onNextStep, onGoBack, onEndStep } = useCreatePeiPdiControl({
    canCreateAi,
  })
  const { mutateAsync: mutateUpdatePeiPdi } = useMutateUpdatePeiPdi()
  const { handleModal } = useModalContext()
  const posthog = usePostHog()
  const { getCount } = usePageTimeCounter()

  const { handleSubmit, control, getValues, formState, reset, setValue, watch, ...others } =
    useForm({
      defaultValues: {
        name: peiPdi?.name,
        day: peiPdi?.day,
        frequency: peiPdi?.frequency,
        duration: peiPdi?.duration ? String(peiPdi?.duration) : undefined,
      },
      resolver: yupResolver(PeiPdiSchema),
    })

  const barithday = watch('patientBirthday')

  useEffect(() => {
    if (barithday) {
      const age = dayjs().diff(dayjs(barithday), 'year')
      const formattedAge = age > 1 ? `${age} anos` : `${age} ano`
      setValue('patientAge', formattedAge)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [barithday])

  useEffect(() => {
    if (user) {
      const date = user?.birthday
      const age = user?.getAge()
      reset({
        patientBirthday: date,
        patientAge: age,
        conditionSuspicions: peiPdi?.conditionSuspicions,
        difficulties: peiPdi?.difficulties,
        generalObjectives: peiPdi?.generalObjectives,
        responsibleCollaboratorId: peiPdi?.responsibleCollaborator.id,
        name: peiPdi?.name,
        day: peiPdi?.day,
        frequency: peiPdi?.frequency,
        duration: peiPdi?.duration ? String(peiPdi?.duration) : undefined,
      })
    }
  }, [user, reset, peiPdi])

  const onSubmit = async () => {
    const body = getValues()
    const age = body.patientAge ? onlyNumsNormalizer(body.patientAge) : undefined

    const formatedBody = {
      duration: Number(body.duration),
      patientId: Number(user?.id),
      responsibleCollaboratorId: Number(body.responsibleCollaboratorId),
      name: body.name,
      frequency: body.frequency as FrequencyInterval,
      day: body.day as CalendarSettingsDays[],
      patientBirthday: body.patientBirthday,
      patientAge: age ? Number(age) : undefined,
      conditionSuspicions: body.conditionSuspicions,
      difficulties: body.difficulties,
      generalObjectives: body.generalObjectives,
    }

    if (isEdit) {
      posthog.capture(buildPath(POSTHOG_EVENTS.LEARNING.PEI_PDI, POSTHOG_ACTIONS.UPDATED), {
        time_on_page: getCount(),
      })

      return await mutateUpdatePeiPdi({
        ...formatedBody,
        peiPdiId: peiPdi?.id || 0,
        userId: user.id,
      }).then(() => handleModal())
    }

    posthog.capture(buildPath(POSTHOG_EVENTS.LEARNING.PEI_PDI, POSTHOG_ACTIONS.CREATED), {
      time_on_page: getCount(),
    })

    onEndStep(formatedBody)
  }

  return (
    <CForm
      id='myForm'
      form={{ handleSubmit, getValues, setValue, control, formState, reset, watch, ...others }}
      onSubmit={onSubmit}
    >
      <Typography variant='h1'>{isEdit ? 'Editar' : 'Criar'} plano</Typography>

      <CStepper
        ref={stepperRef}
        activeStep={step}
        steps={['Definições', 'Objetivos']}
        connectorProps={{ maxWidth: 200 }}
      >
        <FormDefinitionStep key={CreatePeiPdiSteps.DEFINITIONS} nextStep={onNextStep} user={user} />
        <FormGoalsStep
          key={CreatePeiPdiSteps.GOALS}
          onBackStep={onGoBack}
          isEdit={isEdit}
          canCreateAi={canCreateAi}
          isLoading={false}
          patientBirthday={!!user?.birthday}
        />
      </CStepper>
    </CForm>
  )
}

export default PeiPdiForm
