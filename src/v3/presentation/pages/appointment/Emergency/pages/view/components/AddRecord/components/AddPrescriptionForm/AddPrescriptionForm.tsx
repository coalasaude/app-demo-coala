import { yupResolver } from '@hookform/resolvers/yup'
import { Box } from '@mui/material'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { usePostHog } from 'posthog-js/react'
import { useState } from 'react'

import { CForm } from '@/components/Forms/Form'
import { NEW_ROUTES } from '@/constants/routes'
import { useBreakpoint } from '@/hooks/useBreakpoints'
import { RecordsType } from '@/types/records'
import { bindPathParams } from '@/utils/bindParams'
import { FormButtons } from '@/v3/presentation/components/FormButtons'
import { useMutateAddPrescription } from '@/v3/presentation/hooks/api/@v2/appointment/prescription/useMutateAddPrescription'
import { useUrlQueryControl } from '@/v3/presentation/hooks/useUrlQueryControl'
import { usePageTimeCounter } from '@/v3/presentation/hooks/usePageTimeCounter'
import { useParams } from '@/hooks/useParams'
import { useFetchBrowseTimeline } from '@/v3/presentation/hooks/api/@v2/appointment/appointment/useFetchBrowseTimeline'
import { ComplaintModal } from '@/v3/presentation/pages/mental-health/pages/session/components/ModalCertificate/OnlyComplaintModal'

import Medicines from '../../../Prescription/add/components/Medicines/Medicines'
import PrescriptionForm from '../../../Prescription/add/components/PrescriptionForm'
import { initialValues, schema } from '../../../Prescription/add/schema'
import { WrapperButtonsForm } from '../WrapperButtonsForm'
import ButtonWrapperVideoCall from '../../../../../call/components/ButtonWrapperVideoCall'

export const AddPrescriptionForm = () => {
  const router = useRouter()
  const appointmentId = Number(router.query.id)
  const isVideoCall = router.route.includes('call')
  const addPrescription = useMutateAddPrescription()
  const { getCount, resetCounting } = usePageTimeCounter()
  const posthog = usePostHog()
  const { params } = useParams()

  const form = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  })
  const isSmallDevice = useBreakpoint('sm')
  const medicine = form?.watch('medicine')
  const Wrapper = isVideoCall ? ButtonWrapperVideoCall : WrapperButtonsForm

  const { setQueryParam } = useUrlQueryControl({
    queryName: 'recordType',
  })
  const [showModal, setShowModal] = useState(false)
  const { timelineWithoutAttachments } = useFetchBrowseTimeline({ appointmentId })
  const hasRecords = timelineWithoutAttachments?.length && timelineWithoutAttachments.length > 0

  const onSubmit = () => {
    if (!hasRecords) {
      setShowModal(true)
    } else {
      onFinish()
    }
  }

  const onFinish = async () => {
    const body = form.getValues()

    await addPrescription
      .mutateAsync({
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
        validUntil: dayjs().add(Number(body.valid_until), 'day').startOf('day').toDate(),
      })
      .then((prescription) => {
        posthog.capture('user_add_prescription', {
          time_spent: getCount(),
        })
        resetCounting()

        const path = isVideoCall
          ? `${NEW_ROUTES.AUTHENTICATED.APPOINTMENT.CALL.path}?tab=0`
          : `${NEW_ROUTES.AUTHENTICATED.APPOINTMENT.VIEW.path}?tab=0&recordId=${prescription.id}&type=${RecordsType.PRESCRIPTION}`

        router.push(bindPathParams(path, { id: appointmentId }), undefined, { shallow: true })
      })
  }

  const onCancel = () => {
    isSmallDevice ? setQueryParam(null) : form.reset(initialValues)
  }

  return (
    <>
      <CForm form={form} onSubmit={onSubmit} id='myForm'>
        <PrescriptionForm />
        <Medicines error={addPrescription.errorMessage} prescription={true} />

        <Box mb={isSmallDevice || isVideoCall ? 10 : 0} />
        <Wrapper>
          <FormButtons
            display='flex'
            mt={[0, 2]}
            justifyContent='flex-end'
            confirmLabel='Registrar'
            cancelLabel={isSmallDevice ? 'Cancelar' : 'Limpar'}
            isLoading={addPrescription.isPending}
            onConfirm={onFinish}
            disableConfirm={!medicine?.some((m, i) => m?.name && i < medicine.length - 1)}
            onCancel={onCancel}
            minWidth={['100%', 100]}
            cancelVariant='text'
          />
        </Wrapper>

        <ComplaintModal open={showModal} onClose={() => setShowModal(false)} onFinish={onFinish} />
      </CForm>
    </>
  )
}

export default AddPrescriptionForm
