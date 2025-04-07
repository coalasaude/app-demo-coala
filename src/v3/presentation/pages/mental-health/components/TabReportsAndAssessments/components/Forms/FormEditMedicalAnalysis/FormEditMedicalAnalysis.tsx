import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Typography } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'

import { CForm } from '@/components/Forms'
import { FormButtons } from '@/v3/presentation/components/FormButtons'
import { ModalCard, useModalContext } from '@/v3/presentation/components/Modal'
import { useMutateEditMentalHealthMedicalAnalysis } from '@/v3/presentation/hooks/api/@v2/mental-health/reports/medical-analysis/useMutateEditMedicalAnalysis'
import { CTextAreaControlled } from '@/v3/presentation/newComponents'

import { IMedicalAnalysisFormFields, schemaMedicalAnalysis } from './schema'
import { IFormEditMedicalAnalysisProps } from './types'

export function FormEditMedicalAnalysis({ userId, analysis, id }: IFormEditMedicalAnalysisProps) {
  const editMedicalAnalysis = useMutateEditMentalHealthMedicalAnalysis()
  const { handleModal } = useModalContext()

  const form = useForm({
    resolver: yupResolver(schemaMedicalAnalysis),
    defaultValues: {
      analysis,
    },
  })

  const onClose = () => {
    handleModal()
  }

  const onSubmit: SubmitHandler<IMedicalAnalysisFormFields> = async (values) => {
    editMedicalAnalysis
      .mutateAsync({
        analysis: values.analysis,
        userId: userId,
        id,
      })
      .finally(onClose)
  }

  return (
    <ModalCard title='Editar análise' sx={{ width: ['100%', 532] }}>
      <CForm id='myForm_1' form={form} onSubmit={onSubmit}>
        <Box mt={1}>
          <Typography mb={1} variant='h4'>
            Descreva abaixo a análise
          </Typography>
          <CTextAreaControlled
            label=''
            name='analysis'
            placeholder='Digite aqui a análise'
            fullWidth
          />

          <FormButtons
            formId='myForm_1'
            display='flex'
            mt={4}
            justifyContent='flex-end'
            confirmLabel='Salvar'
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
