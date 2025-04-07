import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { CForm } from '@/components/Forms'
import { ViewSkeleton } from '@/components/Skeletons/ViewSkeleton'
import { CBaseContainer } from '@/v3/presentation/components/CBaseContainer'
import { useFetchBrowseDiseaseCidOptions } from '@/v3/presentation/hooks/api/@v2/health-history/diseases/useFetchBrowseDiseaseCidOptions'
import { useFetchReadDisease } from '@/v3/presentation/hooks/api/@v2/health-history/diseases/useFetchReadDisease'
import { useMutateEditDisease } from '@/v3/presentation/hooks/api/@v2/health-history/diseases/useMutateEditDisease'
import { CContainerContent, PageHeader } from '@/v3/presentation/newComponents'

import FormDisease from '../../../components/FormDisease'
import {
  IDiseaseFormFields,
  initialDiseaseValues,
  schemaDisease,
} from '../../../components/FormDisease/schema'
import { otherDiseasesId } from '../../../constant/other-diseases.const'

export const EditDisease = () => {
  const router = useRouter()
  const userId = Number(router.query.userId as string)
  const id = router.query.id as string

  const editDisease = useMutateEditDisease()
  const { disease } = useFetchReadDisease({ userId: userId, diseaseId: Number(id) })
  const { diseaseOptions, setSearch } = useFetchBrowseDiseaseCidOptions()

  const form = useForm({
    defaultValues: initialDiseaseValues,
    resolver: yupResolver(schemaDisease),
  })

  const diseaseCidOptionsProp = (diseaseOptions?.data || [])?.map(({ id, name }) => ({
    value: id,
    label: name,
  })) as { value: number | string; label: string }[]

  diseaseCidOptionsProp.unshift({ value: otherDiseasesId, label: 'Outra' })

  if (disease?.cid) {
    diseaseCidOptionsProp.push({
      value: disease.cid.id,
      label: disease.cid.name,
    })
  }

  const onSubmit = async (body: IDiseaseFormFields) => {
    if (userId && id) {
      const isOtherDisease = body.disease === otherDiseasesId
      await editDisease.mutateAsync({
        diagnoseDate: new Date(body.dateDiagnosis),
        cidId: !isOtherDisease ? Number(body.disease) : undefined,
        observation: body.observation || '',
        treatmentPerformed: body.haveTreatment,
        userId: userId,
        diseaseId: Number(id),
        otherDisease: isOtherDisease ? body.otherDisease : undefined,
        ...(body.document?.size && { file: body.document }),
      })

      router.back()
    }
  }

  useEffect(() => {
    if (disease) {
      form.reset({
        disease: (disease?.cid?.id || otherDiseasesId) as unknown as string,
        dateDiagnosis: disease?.diagnoseDate as unknown as Date,
        haveTreatment: disease?.treatmentPerformed,
        observation: disease?.observation,
        document: { name: disease?.document?.formattedName } as File,
        otherDisease: !disease?.cid?.id ? disease.getDiseaseName() : undefined,
      })
    }
  }, [disease, form])

  if (!disease) return <ViewSkeleton />

  return (
    <>
      <PageHeader title='Ficha de saúde' />
      <CForm id='myForm' form={form} onSubmit={onSubmit}>
        <CBaseContainer
          title='Editar doença:'
          buttonLabel='Editar'
          isLoading={editDisease.isPending}
          buttonDisabled={!form.formState.isDirty}
        >
          <CContainerContent title={disease?.getDiseaseName()}>
            <FormDisease
              diseaseCidOptions={diseaseCidOptionsProp}
              diseaseAutoCompleteChange={setSearch}
            />
          </CContainerContent>
        </CBaseContainer>
      </CForm>
    </>
  )
}
