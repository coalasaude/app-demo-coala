import { yupResolver } from '@hookform/resolvers/yup'
import { Box } from '@mui/material'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'

import { CForm } from '@/components/Forms'
import { ViewSkeleton } from '@/components/Skeletons/ViewSkeleton'
import { CBaseContainer } from '@/v3/presentation/components/CBaseContainer'
import { useFetchBrowseAllergyCategory } from '@/v3/presentation/hooks/api/@v2/health-history/allergies/useFetchBrowseAllergyCategory'
import { useFetchBrowseAllergySymptom } from '@/v3/presentation/hooks/api/@v2/health-history/allergies/useFetchBrowseAllergySymptoms'
import { useMutateAddAllergy } from '@/v3/presentation/hooks/api/@v2/health-history/allergies/useMutateAddAllergy'
import { CContainerContent, PageHeader } from '@/v3/presentation/newComponents'

import { FormAllergy } from '../../../../health-history/components/FormAllergy'
import {
  IAllergyFormFields,
  allergyInitialValues,
  schemaAllergy,
} from '../../../components/FormAllergy/schema'

export const AllergyAddPage = () => {
  const router = useRouter()
  const userId = Number(router.query.userId as string)

  const addAllergy = useMutateAddAllergy()
  const { categories, isPending: isLoadingCategories } = useFetchBrowseAllergyCategory()
  const { symptoms, isPending: isLoadingSymptoms } = useFetchBrowseAllergySymptom()

  const form = useForm({
    defaultValues: allergyInitialValues,
    resolver: yupResolver(schemaAllergy),
  })

  const isLoadingAllergyOptions = isLoadingSymptoms || isLoadingCategories

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

  const onSubmit: SubmitHandler<IAllergyFormFields> = async (body) => {
    if (userId) {
      await addAllergy.mutateAsync({
        otherCategory: body.otherCategory || '',
        categoryId: Number(body.categoryId),
        causerAgent: body.causerAgent,
        orientations: body.orientations,
        symptoms: body.symptom,
        userId: userId,
      })

      router.back()
    }
  }

  return (
    <>
      <PageHeader title='Cadastro de alergias' />
      <CForm id='myForm' form={form} onSubmit={onSubmit}>
        <Box>
          {isLoadingAllergyOptions ? (
            <ViewSkeleton />
          ) : (
            <>
              <CBaseContainer
                buttonLabel='Cadastrar'
                isLoading={addAllergy.isPending}
                buttonDisabled={!form.formState.isDirty}
              >
                <CContainerContent title='Alergia'>
                  <FormAllergy
                    categoryOptions={categoryOptions}
                    symptomOptions={allergyOptionsSymptoms}
                    watch={form.watch}
                  />
                </CContainerContent>
              </CBaseContainer>
            </>
          )}
        </Box>
      </CForm>
    </>
  )
}
