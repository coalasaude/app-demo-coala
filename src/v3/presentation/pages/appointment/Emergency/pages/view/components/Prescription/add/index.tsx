import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { useState } from 'react'
import dayjs from 'dayjs'

import { CForm } from '@/components/Forms/Form'
import { ModalCertificate } from '@/v3/presentation/pages/mental-health/pages/session/components/ModalCertificate'
import { CBaseContainer } from '@/v3/presentation/newComponents'
import { useMutateAddPrescription } from '@/v3/presentation/hooks/api/@v2/appointment/prescription/useMutateAddPrescription'
import { NEW_ROUTES } from '@/constants/routes'
import { bindPathParams } from '@/utils/bindParams'
import { useParams } from '@/hooks/useParams'

import RegisterAddWrapper from '../../Desktop/RegisterAddWrapper/RegisterAddWrapper'

import Medicines from './components/Medicines/Medicines'
import { initialValues, schema } from './schema'
import PrescriptionForm from './components/PrescriptionForm'

export const AddPrescription = () => {
  const router = useRouter()
  const appointmentId = Number(router.query.id)
  const [showModal, setShowModal] = useState(false)
  const addPrescription = useMutateAddPrescription()
  const { params } = useParams()

  const form = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  })
  const watchCertificationPass = form?.watch('certificatePass')
  const medicine = form?.watch('medicine')

  const onSubmit = () => {
    setShowModal(true)
  }

  const onFinish = async () => {
    const body = form.getValues()

    await addPrescription.mutateAsync({
      appointmentId,
      certificationPassword: body.certificatePass || params?.certificatePass,
      medicines: body.medicine
        .filter((m) => !!m.name)
        .map((medicine) => ({
          concentration: Number(medicine.concentration),
          dosage: Number(medicine.dosage),
          medicineConcentrationUnitId: Number(medicine.medicine_concentration_unit_id),
          medicineDosageUnitId: Number(medicine.medicine_dosage_unit_id),
          name: medicine.name,
          scheduledMedicineId: Number(medicine.scheduled_medicine_id),
          observation: medicine.observation,
          recommendation: medicine.recommendation,
          treatmentDays: Number(medicine.valid_until),
        })),
      type: body.type_prescription,
      validUntil: dayjs().add(Number(body.valid_until), 'day').toDate(),
    })

    router.push(
      bindPathParams(`${NEW_ROUTES.AUTHENTICATED.APPOINTMENT.CALL.path}?tab=0`, {
        id: appointmentId,
      }),
    )
  }

  return (
    <RegisterAddWrapper>
      <CForm form={form} onSubmit={onSubmit} id='myForm'>
        <CBaseContainer
          title='Receituário'
          isLoading={addPrescription.isPending}
          buttonLabel='Registrar'
          buttonDisabled={!medicine?.some((m, i) => m?.name && i < medicine.length - 1)}
          onCancel={() => router.back()}
        >
          <PrescriptionForm />
          <Medicines error={addPrescription.errorMessage} prescription={true} />

          <ModalCertificate
            open={showModal}
            onClose={() => setShowModal(false)}
            handleSubmit={onFinish}
            isLoading={addPrescription.isPending}
            isSubmitButtonDisabled={!watchCertificationPass}
          />
        </CBaseContainer>
      </CForm>
    </RegisterAddWrapper>
  )
}

export default AddPrescription
