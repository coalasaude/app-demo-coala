import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'

import { CForm } from '@/components/Forms'
import { spacing } from '@/utils/spacing'
import { CBaseContainer } from '@/v3/presentation/components/CBaseContainer'
import { useMutateAddManyHealthInsurance } from '@/v3/presentation/hooks/api/@v2/users/health-insurance/useMutateAddManyHealthInsurance'
import { useLoadingFeedback } from '@/v3/presentation/hooks/useLoadingFeedback'
import { CAccordion, CAccordionBody, CAccordionList } from '@/v3/presentation/newComponents'
import { DeleteIconButton } from '@/v3/presentation/pages/health-history/components/DeleteIconButton'
import { useFieldArrayForm } from '@/v3/presentation/pages/health-history/pages/first-access/hooks/useFieldArrayForm'
import { BaseFormStepProps } from '@/v3/presentation/pages/health-history/pages/first-access/types'
import { FormHealthInsurance } from '@/v3/presentation/pages/users/components/FormHealthInsurance'

import { IHealthInsurancesFormFields, schemaHealthInsurances } from './schema'

export type FormStepProps = BaseFormStepProps

export const FormStep = ({ onSkip, onConfirm, user }: FormStepProps) => {
  const { execute: executeSkip, isLoading: isLoadingSkip } = useLoadingFeedback(onSkip)
  const addMany = useMutateAddManyHealthInsurance()

  const form = useForm({
    resolver: yupResolver(schemaHealthInsurances),
    defaultValues: { healthInsurance: [{ validUntil: null }] },
  })

  const { fields, getIsExpanded, handleAdd, handleChange, handleRemove, prefixName } =
    useFieldArrayForm({
      prefixName: 'healthInsurance',
      removeDescription: 'Tem certeza que deseja remover esse convênio?',
      removeTitle: 'Remover Convênio',
      initDefaultValues: { validUntil: null },
      form,
    })

  const handleSubmit: SubmitHandler<IHealthInsurancesFormFields> = async (body) => {
    const userId = user.id
    if (userId) {
      await addMany.mutateAsync(
        body.healthInsurance.map((item) => ({
          userId: userId,
          code: item.code,
          insuranceCompany: item.insuranceCompany,
          plan: item.plan,
          validUntil: item.validUntil,
          file: item.document,
        })),
      )
      await onConfirm()
    }
  }

  const isLoading = isLoadingSkip || addMany.isPending

  return (
    <CForm id='myForm' form={form} onSubmit={handleSubmit}>
      <CBaseContainer
        mt={spacing(2)}
        boxShadow='none'
        buttonLabel='Próximo'
        cancelLabel='Cadastrar depois'
        isLoading={isLoading}
        formButtonsProps={{ buttonProps: { fullWidth: true } }}
        onCancel={executeSkip}
        buttonDisabled={!form.formState.isDirty}
      >
        <CAccordionList
          options={fields}
          renderItem={(_, index) => {
            const isExpanded = getIsExpanded(index)
            const title = 'Convênio  ' + String(index + 1).padStart(2, '0')

            return (
              <CAccordion expanded={isExpanded} onChange={handleChange(index)} title={title}>
                <CAccordionBody
                  {...(fields.length > 1 && {
                    secondaryButton: (
                      <DeleteIconButton mt={2} onDelete={() => handleRemove(index)} />
                    ),
                  })}
                >
                  <Box mt={spacing(2)}>
                    <FormHealthInsurance prefix={`${prefixName}.${index}.`} />
                  </Box>
                </CAccordionBody>
              </CAccordion>
            )
          }}
        />
        <Box mt={spacing(3)} display='flex' justifyContent='flex-end'>
          <Button variant='outlined' onClick={() => handleAdd()} size='small'>
            Novo convênio
          </Button>
        </Box>
      </CBaseContainer>
    </CForm>
  )
}
