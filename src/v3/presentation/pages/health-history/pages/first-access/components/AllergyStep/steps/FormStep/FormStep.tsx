import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, Typography } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'

import { CForm } from '@/components/Forms'
import { spacing } from '@/utils/spacing'
import { CBaseContainer } from '@/v3/presentation/components/CBaseContainer'
import { useFetchBrowseAllergyCategory } from '@/v3/presentation/hooks/api/@v2/health-history/allergies/useFetchBrowseAllergyCategory'
import { useFetchBrowseAllergySymptom } from '@/v3/presentation/hooks/api/@v2/health-history/allergies/useFetchBrowseAllergySymptoms'
import { useMutateAddManyAllergy } from '@/v3/presentation/hooks/api/@v2/health-history/allergies/useMutateAddManyAllergy'
import { useLoadingFeedback } from '@/v3/presentation/hooks/useLoadingFeedback'
import { CAccordion, CAccordionBody, CAccordionList } from '@/v3/presentation/newComponents'
import { DeleteIconButton } from '@/v3/presentation/pages/health-history/components/DeleteIconButton'
import { FormAllergy } from '@/v3/presentation/pages/health-history/components/FormAllergy'

import { useFieldArrayForm } from '../../../../hooks/useFieldArrayForm'
import { BaseFormStepProps } from '../../../../types'

import { IAllergiesFormFields, schemaAllergies } from './schema'

export type FormStepProps = BaseFormStepProps

export const FormStep = ({ onSkip, onConfirm, user }: FormStepProps) => {
  const createManyAllergy = useMutateAddManyAllergy()
  const { execute: executeSkip, isLoading: isLoadingSkip } = useLoadingFeedback(onSkip)

  const { categories } = useFetchBrowseAllergyCategory()
  const { symptoms } = useFetchBrowseAllergySymptom()

  const form = useForm({
    resolver: yupResolver(schemaAllergies),
    defaultValues: {
      allergies: [{ categoryId: '', causerAgent: '', orientations: '', symptom: [] }],
    },
  })

  const { fields, getIsExpanded, handleAdd, handleChange, handleRemove, prefixName } =
    useFieldArrayForm({
      prefixName: 'allergies',
      removeDescription: 'Tem certeza que deseja remover essa alergia?',
      removeTitle: 'Remover Alergia',
      form,
    })

  const handleSubmit: SubmitHandler<IAllergiesFormFields> = async (body) => {
    if (user.id) {
      await createManyAllergy.mutateAsync({
        allergies: body.allergies.map((allergy) => ({
          categoryId: Number(allergy.categoryId),
          causerAgent: allergy.causerAgent,
          orientations: allergy.orientations,
          symptoms: allergy.symptom.map((symptom) => Number(symptom)),
        })),
        userId: user.id,
      })
      await onConfirm()
    }
  }

  const categoryOptions =
    categories?.data?.map(({ id, name }) => ({
      value: id,
      label: name,
    })) || []

  const allergyOptionsSymptoms =
    symptoms?.data?.map(({ id, name }) => ({
      value: id,
      label: name,
    })) || []

  const isLoading = isLoadingSkip || createManyAllergy.isPending

  return (
    <CForm id='myForm' form={form} onSubmit={handleSubmit}>
      <CBaseContainer
        mt={spacing(2)}
        boxShadow='none'
        buttonLabel='Próximo'
        formButtonsProps={{ buttonProps: { fullWidth: true } }}
        cancelLabel='Cadastrar depois'
        isLoading={isLoading}
        onCancel={executeSkip}
        buttonDisabled={!form.formState.isDirty}
      >
        <Typography variant='h5' fontWeight='600' mb={spacing(2)}>
          Cadastro de alergias:
        </Typography>

        <CAccordionList
          options={fields}
          renderItem={(_, index) => {
            const isExpanded = getIsExpanded(index)
            const title = 'Alergia ' + (index + 1).toString().padStart(2, '0')

            return (
              <CAccordion expanded={isExpanded} onChange={handleChange(index)} title={title}>
                <CAccordionBody
                  {...(fields.length > 1 && {
                    secondaryButton: <DeleteIconButton onDelete={() => handleRemove(index)} />,
                  })}
                >
                  <Box mt={spacing(2)}>
                    <FormAllergy
                      categoryOptions={categoryOptions}
                      symptomOptions={allergyOptionsSymptoms}
                      prefixName={`${prefixName}.${index}.`}
                      watch={form.watch}
                    />
                  </Box>
                </CAccordionBody>
              </CAccordion>
            )
          }}
        />
        <Box mt={spacing(3)} display='flex' justifyContent='flex-end'>
          <Button variant='outlined' onClick={() => handleAdd()} size='small'>
            Nova alergia
          </Button>
        </Box>
      </CBaseContainer>
    </CForm>
  )
}
