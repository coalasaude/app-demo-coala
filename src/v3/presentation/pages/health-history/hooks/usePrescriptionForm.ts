import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import {
  IPrescriptionMedicineFormFields,
  initialPrescriptionMedicineValues,
  schemaPrescription,
} from '@/v3/presentation/pages/health-history/components/FormPrescriptionMedicine/schema'
import { useMutateAddHealthHistoryDocument } from '@/v3/presentation/hooks/api/@v2/health-history/documents/useMutateAddDocument'
import { DocumentTypeEnum } from '@/types/documentType'
import { useFetchReadMedicineOptions } from '@/v3/presentation/hooks/api/@v2/health-history/medicine/useFetchReadMedicineOptions'

export const usePrescriptionForm = ({
  defaultValue = initialPrescriptionMedicineValues,
  userId,
}: {
  defaultValue?: IPrescriptionMedicineFormFields
  userId: number
}) => {
  const addDocument = useMutateAddHealthHistoryDocument()
  const { data: options, isLoading: isLoadingMedicineOptions } = useFetchReadMedicineOptions({
    userId,
  })

  const form = useForm({ resolver: yupResolver(schemaPrescription), defaultValues: defaultValue })

  const handleAsyncUploadMedicine = async (file: File) => {
    const document = await addDocument.mutateAsync({
      file,
      type: DocumentTypeEnum.MEDICINE,
      userId: userId,
    })

    return document.id
  }

  const handleAsyncUploadPrescription = async (file: File) => {
    const document = await addDocument.mutateAsync({
      file,
      type: DocumentTypeEnum.PRESCRIPTION,
      userId: userId,
    })

    return document.id
  }

  const concentrationUnitOptions =
    options?.concentrationUnit?.map(({ id, name }) => ({
      value: id,
      label: name,
    })) || []

  const dosageUnitOptions =
    options?.dosageUnit?.map(({ id, name }) => ({
      value: id,
      label: name,
    })) || []

  const scheduledMedicineOptions =
    options?.scheduledMedicine?.map(({ id, name }) => ({
      value: id,
      label: name,
    })) || []

  return {
    form,
    isLoadingMedicineOptions,
    concentrationUnitOptions,
    dosageUnitOptions,
    scheduledMedicineOptions,
    handleAsyncUploadMedicine,
    handleAsyncUploadPrescription,
  }
}
