import { yupResolver } from '@hookform/resolvers/yup'
import { Typography } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { usePostHog } from 'posthog-js/react'

import { CForm } from '@/components/Forms'
import { FormButtons } from '@/v3/presentation/components/FormButtons'
import { CTextAreaControlled } from '@/v3/presentation/newComponents'
import { ReportTimelineTypeEnum } from '@/v3/domain/@v2/mental-health/enums/timeline-type.enum'
import { useMutateAddMentalHealthMedicalAnalysis } from '@/v3/presentation/hooks/api/@v2/mental-health/reports/medical-analysis/useMutateAddMedicalAnalysis'
import { useUrlQueryControl } from '@/v3/presentation/hooks/useUrlQueryControl'
import { usePageTimeCounter } from '@/v3/presentation/hooks/usePageTimeCounter'
import {
  POSTHOG_ACTIONS,
  POSTHOG_EVENTS,
  buildPath,
} from '@/v3/presentation/constants/posthog-events.constants'

import { IMedicalAnalysisFormFields, schemaAnalysis } from './schema'
import { IFormAddMedicalAnalysisProps } from './types'

export function FormAddMedicalAnalysis({
  userId,
  requestedAnalysisId,
}: IFormAddMedicalAnalysisProps) {
  const addAnalysis = useMutateAddMentalHealthMedicalAnalysis()
  const { replaceManyQueryParam } = useUrlQueryControl({})
  const posthog = usePostHog()
  const { getCount } = usePageTimeCounter()

  const form = useForm({
    resolver: yupResolver(schemaAnalysis),
    defaultValues: { analysis: '' },
  })

  const onSubmit: SubmitHandler<IMedicalAnalysisFormFields> = async (values) => {
    await addAnalysis.mutateAsync({
      analysis: values.analysis,
      requestedAnalysisId,
      userId: userId,
    })

    posthog.capture(buildPath(POSTHOG_EVENTS.LEARNING.MEDICAL_ANALYSIS, POSTHOG_ACTIONS.CREATED), {
      time_on_page: getCount(),
    })

    replaceManyQueryParam({
      reportType: ReportTimelineTypeEnum.MEDICIAL_ANALYSIS,
    })
  }

  return (
    <CForm id='medicalAnalysis' form={form} onSubmit={onSubmit}>
      <Typography mb={1} variant='h4'>
        Escrever análise
      </Typography>
      <CTextAreaControlled label='' name='analysis' placeholder='Digite aqui a análise' fullWidth />
      <FormButtons
        display='flex'
        formId='medicalAnalysis'
        mt={2}
        justifyContent='flex-end'
        isLoading={addAnalysis.isPending}
        confirmLabel='Enviar análise'
        disableConfirm={!form.formState.isValid}
        minWidth={135}
      />
    </CForm>
  )
}
