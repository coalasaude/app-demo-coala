import { yupResolver } from '@hookform/resolvers/yup'
import { Box } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { usePostHog } from 'posthog-js/react'

import { CForm } from '@/components/Forms'
import { FormButtons } from '@/v3/presentation/components/FormButtons'
import { ModalCard, useModalContext } from '@/v3/presentation/components/Modal'
import { useMutateAddMentalHealthRequestAnalysis } from '@/v3/presentation/hooks/api/@v2/mental-health/reports/request-analysis/useMutateAddRequestAnalysis'
import { usePageTimeCounter } from '@/v3/presentation/hooks/usePageTimeCounter'
import {
  buildPath,
  POSTHOG_ACTIONS,
  POSTHOG_EVENTS,
} from '@/v3/presentation/constants/posthog-events.constants'

import { RequestAnalysisForm } from '../components/RequestAnalysisForm/RequestAnalysisForm'

import {
  initialValuesRequestAnalysis,
  IRequestAnalysisFormFields,
  schemaRequestAnalysis,
} from './schema'
import { IFormRequestAnalysisProps } from './types'

export function FormAddRequestAnalysis({ userId }: IFormRequestAnalysisProps) {
  const { handleModal } = useModalContext()

  const form = useForm({
    resolver: yupResolver(schemaRequestAnalysis),
    defaultValues: initialValuesRequestAnalysis,
  })
  const posthog = usePostHog()
  const { getCount } = usePageTimeCounter()

  const addRequestAnalysis = useMutateAddMentalHealthRequestAnalysis()

  const onClose = () => {
    handleModal()
  }

  const onSubmit: SubmitHandler<IRequestAnalysisFormFields> = async (values) => {
    addRequestAnalysis
      .mutateAsync({
        reason: values.reason,
        userId: userId,
      })
      .finally(onClose)

    posthog.capture(
      buildPath(POSTHOG_EVENTS.LEARNING.REQUESTED_ANALYSIS, POSTHOG_ACTIONS.CREATED),
      {
        time_on_page: getCount(),
      },
    )
  }

  return (
    <ModalCard title='Solicitar análise' sx={{ width: ['100%', 532] }}>
      <CForm id='myForm' form={form} onSubmit={onSubmit}>
        <Box mt={1}>
          <RequestAnalysisForm />
          <FormButtons
            display='flex'
            justifyContent='flex-end'
            confirmLabel='Concluir'
            mt={4}
            cancelLabel={'Cancelar'}
            isLoading={false}
            disableConfirm={false}
            onCancel={onClose}
            minWidth={['100%', 100]}
          />
        </Box>
      </CForm>
    </ModalCard>
  )
}
