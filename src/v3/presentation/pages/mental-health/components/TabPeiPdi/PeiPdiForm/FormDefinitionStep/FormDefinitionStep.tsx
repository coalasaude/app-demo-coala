import { debounce, get } from 'lodash'
import { useFormContext } from 'react-hook-form'
import { useMemo, useState } from 'react'
import { usePostHog } from 'posthog-js/react'

import { UserModel } from '@/v3/domain/@v2/users/users.model'
import { CSelectControlled } from '@/components/Forms'
import { GridItem, GridWrapper } from '@/components/Grid'
import { FormButtons } from '@/v3/presentation/components/FormButtons'
import { useModalContext } from '@/v3/presentation/components/Modal'
import { CInputControlled } from '@/v3/presentation/newComponents'
import CInputLabel from '@/v3/presentation/newComponents/atoms/CInputLabel/CInputLabel'
import { UserSelectInputForm } from '@/v3/presentation/pages/appointment/Emergency/components/Appointment/FormAppointment/components'
import { removeAccents } from '@/v3/utils/remove-accents'
import { CalendarSettingsDays, FrequencyInterval } from '@/constants/mentalHealth'
import { usePageTimeCounter } from '@/v3/presentation/hooks/usePageTimeCounter'
import {
  POSTHOG_ACTIONS,
  POSTHOG_EVENTS,
  buildPath,
} from '@/v3/presentation/constants/posthog-events.constants'
import { useFetchBrowsePeiPdiRequesters } from '@/v3/presentation/hooks/api/@v2/mental-health/useFetchBrowsePeiPdiRequesters'

import { generateDurationOptions } from './utils/generateDurationOptions'

interface FormDefinitionStepProps {
  nextStep: () => void
  user?: UserModel
}

const generatedDurationsOptions = generateDurationOptions()

const FormDefinitionStep = ({ nextStep, user }: FormDefinitionStepProps) => {
  const { handleModal } = useModalContext()
  const [searchName, setSearchName] = useState<string | undefined>()
  const institutionId = user?.getInstitutionsIds()[0]
  const posthog = usePostHog()
  const { getCount } = usePageTimeCounter()

  const { requesters, isLoading } = useFetchBrowsePeiPdiRequesters({
    institutionId: institutionId || 0,
    searchName,
    limit: 10,
  })

  const debouncedSetSearch = useMemo(
    () =>
      debounce((value) => {
        setSearchName(value)
      }, 500),
    [setSearchName],
  )

  const {
    formState: { errors },
    trigger,
  } = useFormContext()

  const onConfirm = async () => {
    const isValid = await trigger([
      'name',
      'responsibleCollaboratorId',
      'frquency',
      'day',
      'duration',
    ])
    if (!isValid) return

    posthog.capture(buildPath(POSTHOG_EVENTS.LEARNING.PEI_PDI, POSTHOG_ACTIONS.COMPLETED_STEP_1), {
      time_on_page: getCount(),
    })

    nextStep()
  }

  const frequencyOptions = [
    { label: '1 x na semana', value: FrequencyInterval.ONE },
    { label: '2 x na semana', value: FrequencyInterval.TWO },
    { label: '3 x na semana', value: FrequencyInterval.THREE },
    { label: '4 x na semana', value: FrequencyInterval.FOUR },
    { label: '5 x na semana', value: FrequencyInterval.FIVE },
    { label: '6 x na semana', value: FrequencyInterval.SIX },
    { label: '7 x na semana', value: FrequencyInterval.SEVEN },
  ]

  const dayOptions = [
    { label: 'Domingo', value: CalendarSettingsDays.SUNDAY },
    { label: 'Segunda-feira', value: CalendarSettingsDays.MONDAY },
    { label: 'Terça-feira', value: CalendarSettingsDays.TUESDAY },
    { label: 'Quarta-feira', value: CalendarSettingsDays.WEDNESDAY },
    { label: 'Quinta-feira', value: CalendarSettingsDays.THURSDAY },
    { label: 'Sexta-feira', value: CalendarSettingsDays.FRIDAY },
    { label: 'Sábado', value: CalendarSettingsDays.SATURDAY },
  ]

  return (
    <>
      <GridWrapper mt={2}>
        <GridItem xs={12}>
          <CInputLabel title='Nome do plano*' error={!!get(errors, 'name')} />
          <CInputControlled
            name='name'
            label=''
            placeholder='Nome do plano'
            fullWidth
            error={!!get(errors, 'name')}
          />
        </GridItem>
        <GridItem xs={12}>
          <CInputLabel title='Colaborador responsável' />
          <UserSelectInputForm
            name='responsibleCollaboratorId'
            label=''
            placeholder='Colaborador responsável'
            isLoading={isLoading}
            users={requesters?.data}
            onSearch={(value) => debouncedSetSearch(removeAccents(value))}
            sx={{ mb: 0 }}
          />
        </GridItem>
        <GridItem xs={12} md={4}>
          <CInputLabel title='Frequência' error={!!get(errors, 'frequency')} />
          <CSelectControlled
            name='frequency'
            label=''
            placeholder='Frequência'
            fullWidth
            disabledNullOption
            options={frequencyOptions}
          />
        </GridItem>
        <GridItem xs={12} md={4}>
          <CInputLabel title='Dias da semana' error={!!get(errors, 'day')} />
          <CSelectControlled
            name='day'
            label=''
            placeholder='Dias da semana'
            fullWidth
            disabledNullOption
            multiple
            options={dayOptions}
          />
        </GridItem>
        <GridItem xs={12} md={4}>
          <CInputLabel title='Duração' />
          <CSelectControlled
            name='duration'
            placeholder='Duração'
            label=''
            fullWidth
            disabledNullOption
            options={generatedDurationsOptions}
          />
        </GridItem>
      </GridWrapper>
      <FormButtons
        mt={3}
        isLoading={false}
        justifyContent='flex-end'
        minWidth='120px'
        confirmLabel='Próximo'
        cancelLabel='Cancelar'
        cancelVariant='outlined'
        onConfirm={onConfirm}
        onCancel={() => handleModal()}
        buttonFlex
      />
    </>
  )
}

export default FormDefinitionStep
