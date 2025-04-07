import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { DefaultValues, useForm } from 'react-hook-form'

import { useFetchBrowseVaccineOptions } from '@/v3/presentation/hooks/api/@v2/health-history/vaccine/useFetchBrowseVaccineOptions'
import { useMutateAddHealthHistoryDocument } from '@/v3/presentation/hooks/api/@v2/health-history/documents/useMutateAddDocument'
import { DocumentTypeEnum } from '@/types/documentType'

import {
  IVaccineComprovantFormFields,
  initialComprovantValues,
  schemaComprovant,
} from '../components/FormComprovant/schema'

export const useComprovantForm = ({
  defaultValue = initialComprovantValues,
}: {
  defaultValue?: DefaultValues<IVaccineComprovantFormFields>
  userId?: number
}) => {
  const router = useRouter()
  const selectedUserId = Number(router.query.userId as string)

  const { vaccines, isPending: isLoading } = useFetchBrowseVaccineOptions({
    userId: selectedUserId,
  })

  const addDocument = useMutateAddHealthHistoryDocument()

  const form = useForm({ resolver: yupResolver(schemaComprovant), defaultValues: defaultValue })

  const handleAsyncUpload = async (file: File) => {
    const document = await addDocument.mutateAsync({
      file,
      type: DocumentTypeEnum.VACCINE,
      userId: selectedUserId,
    })

    return document.id
  }

  const options =
    vaccines?.data?.map(({ id, name }) => ({
      value: id,
      label: name,
    })) || []

  return {
    form,
    options,
    isLoading: isLoading,
    handleAsyncUpload,
    isLoadingDocument: addDocument.isPending,
  }
}
