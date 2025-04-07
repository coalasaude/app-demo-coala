import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, Typography } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'

import { CForm } from '@/components/Forms'
import { DocumentTypeEnum } from '@/types/documentType'
import { spacing } from '@/utils/spacing'
import { AddManyDiseaseParams } from '@/v3/infra/services/@v2/health-history/diseases/add-many-disease'
import { CBaseContainer } from '@/v3/presentation/components/CBaseContainer'
import { useFetchBrowseDiseaseCidOptions } from '@/v3/presentation/hooks/api/@v2/health-history/diseases/useFetchBrowseDiseaseCidOptions'
import { useMutateAddManyDisease } from '@/v3/presentation/hooks/api/@v2/health-history/diseases/useMutateAddManyDisease'
import { useMutateAddHealthHistoryDocument } from '@/v3/presentation/hooks/api/@v2/health-history/documents/useMutateAddDocument'
import { useLoadingFeedback } from '@/v3/presentation/hooks/useLoadingFeedback'
import { CAccordion, CAccordionBody, CAccordionList } from '@/v3/presentation/newComponents'
import { DeleteIconButton } from '@/v3/presentation/pages/health-history/components/DeleteIconButton'
import FormDisease from '@/v3/presentation/pages/health-history/components/FormDisease'
import { initialDiseaseValues } from '@/v3/presentation/pages/health-history/components/FormDisease/schema'
import { otherDiseasesId } from '@/v3/presentation/pages/health-history/constant/other-diseases.const'
import { useFieldArrayForm } from '@/v3/presentation/pages/health-history/pages/first-access/hooks/useFieldArrayForm'
import { BaseFormStepProps } from '@/v3/presentation/pages/health-history/pages/first-access/types'

import { IDiseasesFormFields, initialDiseasesValues, schemaDiseases } from './schema'

export type FormStepProps = BaseFormStepProps

export const FormStep = ({ onSkip, onConfirm, user }: FormStepProps) => {
  const { diseaseOptions, setSearch } = useFetchBrowseDiseaseCidOptions()
  const addDocument = useMutateAddHealthHistoryDocument()

  const addManyDiseases = useMutateAddManyDisease()
  const { execute: executeSkip, isLoading: isLoadingSkip } = useLoadingFeedback(onSkip)

  const form = useForm({
    resolver: yupResolver(schemaDiseases),
    defaultValues: initialDiseasesValues,
  })

  const { fields, getIsExpanded, handleAdd, handleChange, handleRemove, prefixName } =
    useFieldArrayForm({
      prefixName: 'diseases',
      removeDescription: 'Tem certeza que deseja remover essa doença?',
      removeTitle: 'Remover Doença',
      initDefaultValues: initialDiseaseValues,
      form,
    })

  const handleSubmit: SubmitHandler<IDiseasesFormFields> = async (body) => {
    if (user.id && body.diseases) {
      await addManyDiseases.mutateAsync({
        userId: user.id,
        diseases: body.diseases.map<AddManyDiseaseParams['diseases'][0]>((disease) => {
          const isOtherDisease = disease.disease === otherDiseasesId

          return {
            diagnoseDate: new Date(disease.dateDiagnosis),
            cidId: !isOtherDisease ? Number(disease.disease) : undefined,
            documentId: disease.document || undefined,
            observation: disease.observation || '',
            treatmentPerformed: disease.haveTreatment,
            otherDisease: isOtherDisease ? disease.otherDisease : undefined,
          }
        }),
      })
      await onConfirm()
    }
  }

  const handleAsyncUpload = async (file: File) => {
    const document = await addDocument.mutateAsync({
      file,
      type: DocumentTypeEnum.DISEASE,
      userId: user.id,
    })

    return document.id
  }

  const diseaseCidOptionsProp = (diseaseOptions?.data || [])?.map(({ id, name }) => ({
    value: id,
    label: name,
  })) as { value: number | string; label: string }[]

  diseaseCidOptionsProp.unshift({ value: otherDiseasesId, label: 'Outra' })

  const isLoading = isLoadingSkip || addManyDiseases.isPending || addDocument.isPending

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
          Cadastro de doenças:
        </Typography>

        <CAccordionList
          options={fields}
          renderItem={(_, index) => {
            const isExpanded = getIsExpanded(index)
            const title = 'Doença ' + (index + 1).toString().padStart(2, '0')

            return (
              <CAccordion expanded={isExpanded} onChange={handleChange(index)} title={title}>
                <CAccordionBody
                  {...(fields.length > 1 && {
                    secondaryButton: <DeleteIconButton onDelete={() => handleRemove(index)} />,
                  })}
                >
                  <Box mt={spacing(2)}>
                    <FormDisease
                      prefixName={`${prefixName}.${index}.`}
                      diseaseCidOptions={diseaseCidOptionsProp}
                      diseaseAutoCompleteChange={setSearch}
                      handleAsyncUpload={handleAsyncUpload}
                    />
                  </Box>
                </CAccordionBody>
              </CAccordion>
            )
          }}
        />
        <Box mt={spacing(3)} display='flex' justifyContent='flex-end'>
          <Button variant='outlined' onClick={() => handleAdd()} size='small'>
            Nova doença
          </Button>
        </Box>
      </CBaseContainer>
    </CForm>
  )
}
