import { yupResolver } from '@hookform/resolvers/yup'
import { Box } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'

import { CForm } from '@/components/Forms'
import { FormButtons } from '@/v3/presentation/components/FormButtons'
import { ModalCard, useModalContext } from '@/v3/presentation/components/Modal'
import { useMutateEditMentalHealthRequestAnalysis } from '@/v3/presentation/hooks/api/@v2/mental-health/reports/request-analysis/useMutateEditRequestAnalysis'

import { RequestAnalysisForm } from '../components/RequestAnalysisForm/RequestAnalysisForm'

import { IRequestAnalysisFormFields, schemaRequestAnalysis } from './schema'
import { IFormRequestAnalysisProps } from './types'

export function FormEditRequestAnalysis({ userId, reason, id }: IFormRequestAnalysisProps) {
  const editRequestAnalysis = useMutateEditMentalHealthRequestAnalysis()
  const { handleModal } = useModalContext()

  const form = useForm({
    resolver: yupResolver(schemaRequestAnalysis),
    defaultValues: {
      reason,
    },
  })

  const onClose = () => {
    handleModal()
  }

  const onSubmit: SubmitHandler<IRequestAnalysisFormFields> = async (values) => {
    editRequestAnalysis
      .mutateAsync({
        reason: values.reason,
        userId: userId,
        id,
      })
      .finally(onClose)
  }

  return (
    <ModalCard title='Editar solicitação' sx={{ width: ['100%', 532] }}>
      <CForm id='requestedAnalysis' form={form} onSubmit={onSubmit}>
        <Box mt={1}>
          <RequestAnalysisForm />
          <FormButtons
            display='flex'
            mt={4}
            justifyContent='flex-end'
            confirmLabel='Salvar'
            cancelLabel={'Cancelar'}
            isLoading={false}
            disableConfirm={false}
            onCancel={onClose}
            onConfirm={form.handleSubmit(onSubmit)}
            minWidth={['100%', 100]}
          />
        </Box>
      </CForm>
    </ModalCard>
  )
}
