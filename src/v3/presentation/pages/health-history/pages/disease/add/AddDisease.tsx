import { yupResolver } from '@hookform/resolvers/yup'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import { CForm } from '@/components/Forms'
import { CBaseContainer } from '@/v3/presentation/components/CBaseContainer'
import { useMutateAddDisease } from '@/v3/presentation/hooks/api/@v2/health-history/diseases/useMutateAddDisease'
import { CContainerContent, PageHeader } from '@/v3/presentation/newComponents'
import { useFetchBrowseDiseaseCidOptions } from '@/v3/presentation/hooks/api/@v2/health-history/diseases/useFetchBrowseDiseaseCidOptions'

import FormDisease from '../../../components/FormDisease'
import {
  IDiseaseFormFields,
  initialDiseaseValues,
  schemaDisease,
} from '../../../components/FormDisease/schema'
import { otherDiseasesId } from '../../../constant/other-diseases.const'

export const AddDisease = () => {
  const addDisease = useMutateAddDisease()
  const { diseaseOptions, setSearch } = useFetchBrowseDiseaseCidOptions()
  const router = useRouter()
  const userId = Number(router.query.userId as string)

  const form = useForm({
    defaultValues: initialDiseaseValues,
    resolver: yupResolver(schemaDisease),
  })

  const diseaseCidOptionsProp = (diseaseOptions?.data || [])?.map(({ id, name }) => ({
    value: id,
    label: name,
  })) as { value: number | string; label: string }[]

  diseaseCidOptionsProp.unshift({ value: otherDiseasesId, label: 'Outra' })

  const onSubmit = async (body: IDiseaseFormFields) => {
    if (userId) {
      const isOtherDisease = body.disease === otherDiseasesId
      await addDisease.mutateAsync({
        diagnoseDate: dayjs(body.dateDiagnosis).set('h', 12).toDate(),
        cidId: !isOtherDisease ? Number(body.disease) : undefined,
        observation: body.observation || '',
        treatmentPerformed: body.haveTreatment,
        file: body.document,
        userId,
        otherDisease: isOtherDisease ? body.otherDisease : undefined,
      })

      router.back()
    }
  }

  return (
    <>
      <PageHeader title='Cadastro de doenças' />
      <CForm id='myForm' form={form} onSubmit={onSubmit}>
        <CBaseContainer
          isLoading={addDisease.isPending}
          buttonLabel='Cadastrar'
          buttonDisabled={!form.formState.isDirty}
        >
          <CContainerContent title='Doença'>
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
