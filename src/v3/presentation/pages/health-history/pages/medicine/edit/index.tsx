import { Box } from '@mui/material'
import { useRouter } from 'next/router'
import { SubmitHandler } from 'react-hook-form'

import { ViewSkeleton } from '@/components/Skeletons/ViewSkeleton'
import { NEW_ROUTES } from '@/constants/routes'
import { DocumentTypeEnum } from '@/types/documentType'
import { bindPathParams } from '@/utils/bindParams'
import { spacing } from '@/utils/spacing'
import { useModalContext } from '@/v3/presentation/components/Modal'
import { useMutateAddHealthHistoryDocument } from '@/v3/presentation/hooks/api/@v2/health-history/documents/useMutateAddDocument'
import { useFetchReadMedicine } from '@/v3/presentation/hooks/api/@v2/health-history/medicine/useFetchReadMedicine'
import { useFetchReadMedicineOptions } from '@/v3/presentation/hooks/api/@v2/health-history/medicine/useFetchReadMedicineOptions'
import { useMutateDeleteMedicine } from '@/v3/presentation/hooks/api/@v2/health-history/medicine/useMutateDeleteMedicine'
import { useMutateEditMedicine } from '@/v3/presentation/hooks/api/@v2/health-history/medicine/useMutateEditMedicine'
import { PageHeader } from '@/v3/presentation/newComponents'

import { CDialogue } from '../../../../../newComponents/layout/CDialogue'
import { IMedicineFormFields } from '../../../components/FormMedicine/schema'

import { FormMedicineContainer } from './components/FormMedicineContainer'

export const MedicineEditPage = () => {
  const router = useRouter()
  const userId = Number(router.query.userId as string)
  const { handleModal } = useModalContext()
  const id = router.query.id as string

  const addDocument = useMutateAddHealthHistoryDocument()
  const { medicine } = useFetchReadMedicine({ userId: userId, medicineId: Number(id) })
  const { data: options, isLoading: isLoadingMedicineOptions } = useFetchReadMedicineOptions({
    userId: userId,
  })
  const editMedicine = useMutateEditMedicine()
  const deleteMedicine = useMutateDeleteMedicine()

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

  const healthHistoryRoute = `${bindPathParams(
    NEW_ROUTES.AUTHENTICATED.USERS.HEALTH_HISTORIC.path,
    {
      userId: userId,
    },
  )}?tab=2`

  const onSubmitAction = async (payload: IMedicineFormFields) => {
    if (userId && id) {
      const startHour = payload.startHour ? new Date(payload.startHour).getHours() : undefined
      const startDate = payload.startDate ? new Date(payload.startDate) : undefined

      await editMedicine.mutateAsync({
        userId: userId,
        medicineId: Number(id),
        startHour,
        startDate,
        name: payload.name,
        concentration: payload.concentration,
        dosage: payload.dosage,
        medicineConcentrationUnitId: payload.medicineConcentrationUnitId,
        medicineDosageUnitId: payload.medicineDosageUnitId,
        scheduledMedicineId: payload.scheduledMedicineId,
        recommendation: payload.recommendation,
        treatmentDays: payload.treatmentDays,
        observation: payload.observation,
        documentId: payload.packagePhoto?.id ? (payload.packagePhoto?.id as number) : undefined,
        prescription: payload.prescriptionFile?.id
          ? {
              documentId: payload.prescriptionFile.id as number,
            }
          : undefined,
      })

      router.push(healthHistoryRoute)
    }
  }

  const onSubmit: SubmitHandler<IMedicineFormFields> = async (paylod) => {
    handleModal(
      <CDialogue
        confirmButtonLabel='Sim'
        cancelButtonLabel='Não'
        onConfirm={async () => onSubmitAction(paylod)}
        title='Atenção'
        description='Você tem certeza que deseja salvar as alterações?'
      />,
    )
  }

  const onRemoveMedicine = async () => {
    if (id && userId) {
      await deleteMedicine.mutateAsync({ medicineId: Number(id), userId: userId })
      router.push(healthHistoryRoute)
    }
  }

  const handleRemoveMedicine = () => {
    handleModal(
      <CDialogue
        confirmButtonLabel='Remover'
        onConfirm={onRemoveMedicine}
        title='Remover Medicamento'
        description='Tem certeza que deseja remover esse medicamento?'
      />,
    )
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

  return (
    <Box mx={spacing(2)}>
      {!medicine || isLoadingMedicineOptions ? (
        <ViewSkeleton />
      ) : (
        <>
          <PageHeader title='Ficha de saúde' />
          <FormMedicineContainer
            concentrationUnitOptions={concentrationUnitOptions}
            dosageUnitOptions={dosageUnitOptions}
            scheduledMedicineOptions={scheduledMedicineOptions}
            medicine={medicine}
            onRemove={handleRemoveMedicine}
            onSubmit={onSubmit}
            onCancel={router.back}
            isLoading={editMedicine.isPending}
            handleAsyncUploadMedicine={handleAsyncUploadMedicine}
            handleAsyncUploadPrescription={handleAsyncUploadPrescription}
          />
        </>
      )}
    </Box>
  )
}
