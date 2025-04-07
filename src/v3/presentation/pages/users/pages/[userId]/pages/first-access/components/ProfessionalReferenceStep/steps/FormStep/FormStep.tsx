import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'

import { CForm } from '@/components/Forms'
import { CBaseContainer } from '@/v3/presentation/components/CBaseContainer'
import { useMutateAddManyProfessionalReference } from '@/v3/presentation/hooks/api/@v2/users/professional-references/useMutateAddManyProfessionalReference'
import { useLoadingFeedback } from '@/v3/presentation/hooks/useLoadingFeedback'
import { CAccordion, CAccordionBody, CAccordionList } from '@/v3/presentation/newComponents'
import { DeleteIconButton } from '@/v3/presentation/pages/health-history/components/DeleteIconButton'
import { useFieldArrayForm } from '@/v3/presentation/pages/health-history/pages/first-access/hooks/useFieldArrayForm'
import { BaseFormStepProps } from '@/v3/presentation/pages/health-history/pages/first-access/types'
import { FormProfessionalReference } from '@/v3/presentation/pages/users/components/FormProfessionalReference'

import { IProfessionalsFormFields, professionalsDefaultValues, schemaProfessionals } from './schema'

export type FormStepProps = BaseFormStepProps

export const FormStep = ({ onSkip, onConfirm, user }: FormStepProps) => {
  const { execute: executeSkip, isLoading: isLoadingSkip } = useLoadingFeedback(onSkip)
  const addMany = useMutateAddManyProfessionalReference()

  const form = useForm({
    resolver: yupResolver(schemaProfessionals),
    defaultValues: professionalsDefaultValues,
  })

  const { fields, getIsExpanded, handleAdd, handleChange, handleRemove, prefixName } =
    useFieldArrayForm({
      prefixName: 'professionalReference',
      removeDescription: 'Tem certeza que deseja remover esse profissional de saúde?',
      removeTitle: 'Remover Profissional',
      initDefaultValues: { validUntil: null },
      form,
    })

  const handleSubmit: SubmitHandler<IProfessionalsFormFields> = async (body) => {
    const userId = user.id
    if (userId) {
      await addMany.mutateAsync(
        body.professionalReference.map((item) => ({
          userId: userId,
          name: item.name,
          telephone: item.phone,
          email: item.email,
          professionalType: item.professionalType,
        })),
      )
      await onConfirm()
    }
  }

  const isLoading = isLoadingSkip || addMany.isPending

  return (
    <CForm id='myForm' form={form} onSubmit={handleSubmit}>
      <CBaseContainer
        mt={2}
        boxShadow='none'
        buttonLabel='Próximo'
        cancelLabel='Cadastrar depois'
        isLoading={isLoading}
        onCancel={executeSkip}
        formButtonsProps={{ buttonProps: { fullWidth: true } }}
        buttonDisabled={!form.formState.isDirty}
      >
        <CAccordionList
          options={fields}
          renderItem={(_, index) => {
            const isExpanded = getIsExpanded(index)
            const title = 'Profissional de saúde ' + String(index + 1).padStart(2, '0')

            return (
              <CAccordion expanded={isExpanded} onChange={handleChange(index)} title={title}>
                <CAccordionBody
                  {...(fields.length > 1 && {
                    secondaryButton: (
                      <DeleteIconButton mt={2} onDelete={() => handleRemove(index)} />
                    ),
                  })}
                >
                  <Box mt={2}>
                    <FormProfessionalReference prefix={`${prefixName}.${index}.`} />
                  </Box>
                </CAccordionBody>
              </CAccordion>
            )
          }}
        />
        <Box mt={3} display='flex' justifyContent='flex-end'>
          <Button variant='outlined' onClick={() => handleAdd()} size='small'>
            Novo contato
          </Button>
        </Box>
      </CBaseContainer>
    </CForm>
  )
}
