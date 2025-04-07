import { useRouter } from 'next/router'
import { useState } from 'react'

import {
  AddMedicineParams,
  AddPrescriptionParams,
} from '@/v3/infra/services/@v2/health-history/medicine/add-prescription'
import { useMutateAddPrescription } from '@/v3/presentation/hooks/api/@v2/health-history/medicine/useMutateAddPrescription'

import { IPrescriptionMedicineFormFields } from '../components/FormPrescriptionMedicine/schema'

export const usePrescriptionControl = () => {
  const router = useRouter()
  const userId = Number(router.query.userId as string)
  const [prescriptions, setPrescriptions] = useState<IPrescriptionMedicineFormFields[]>([])
  const [prescriptionsIndex, setPrescriptionsIndex] = useState<number>()
  const addPrescription = useMutateAddPrescription()

  const isPrescriptionSelected = typeof prescriptionsIndex === 'number'

  const onSubmit = async () => {
    if (userId) {
      const payload: AddPrescriptionParams[] = prescriptions.map((item) => ({
        documentId: item.prescriptionFile.id as number,
        emissionDate: new Date(item.emissionDate as any),
        medicines: item.medicines.map<AddMedicineParams>((medicine) => {
          const startHour = medicine.startHour ? new Date(medicine.startHour).getHours() : undefined
          const startDate = medicine.startDate ? new Date(medicine.startDate) : undefined
          return {
            documentId: medicine.packagePhoto?.id as number,
            name: medicine.name,
            concentration: medicine.concentration,
            dosage: medicine.dosage,
            medicineConcentrationUnitId: medicine.medicineConcentrationUnitId,
            medicineDosageUnitId: medicine.medicineDosageUnitId,
            scheduledMedicineId: medicine.scheduledMedicineId,
            recommendation: medicine.recommendation,
            treatmentDays: medicine.treatmentDays,
            observation: medicine.observation,
            startHour,
            startDate,
            authorizationStatus: medicine.authorizationStatus,
          }
        }),
      }))

      await addPrescription.mutateAsync({ userId: userId, prescriptions: payload })
    }
  }

  const handleAddPrescription = (prescription: IPrescriptionMedicineFormFields) => {
    if (isPrescriptionSelected) {
      const newPrescriptions = prescriptions.map((item, index) => {
        if (index === prescriptionsIndex) {
          return prescription
        }
        return item
      })
      setPrescriptions(newPrescriptions)
    } else {
      setPrescriptions([...prescriptions, prescription])
    }
  }

  const defaultValue = isPrescriptionSelected ? prescriptions[prescriptionsIndex] : undefined

  return {
    userId: userId,
    prescriptions,
    setPrescriptions,
    prescriptionsIndex,
    setPrescriptionsIndex,
    handleAddPrescription,
    onSubmit,
    defaultValue,
    isLoadingCreatePrescriptions: addPrescription.isPending,
  }
}
