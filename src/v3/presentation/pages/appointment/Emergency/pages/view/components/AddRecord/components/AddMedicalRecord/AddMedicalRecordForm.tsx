import { yupResolver } from '@hookform/resolvers/yup'
import { Alert, Box } from '@mui/material'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { usePostHog } from 'posthog-js/react'
import { useState } from 'react'

import { CForm } from '@/components/Forms'
import { NEW_ROUTES } from '@/constants/routes'
import useMediaQuery from '@/hooks/useMediaQuery'
import { useParams } from '@/hooks/useParams'
import { MedicalRecordClassification } from '@/types/medicalRecord'
import { RecordsType } from '@/types/records'
import { bindPathParams } from '@/utils/bindParams'
import { useFetchReadAppointment } from '@/v3/presentation/hooks/api/@v2/appointment/appointment/useFetchReadAppointment'
import { useMutateAddMedicalRecord } from '@/v3/presentation/hooks/api/@v2/appointment/medical-record/useMutateAddMedicalRecord'
import { useAuth } from '@/v3/presentation/hooks/useAuth'
import { useUrlQueryControl } from '@/v3/presentation/hooks/useUrlQueryControl'
import { schemaDiagnose } from '@/containers/Appointment/Emergency/cid/add/types'
import { usePageTimeCounter } from '@/v3/presentation/hooks/usePageTimeCounter'
import { useFetchBrowseTimeline } from '@/v3/presentation/hooks/api/@v2/appointment/appointment/useFetchBrowseTimeline'
import { ComplaintModal } from '@/v3/presentation/pages/mental-health/pages/session/components/ModalCertificate/OnlyComplaintModal'

import { MedicalRecordForm } from '../../../MedicalRecord/add/components'
import {
  AddMedicalRecordProps,
  defaultValuesMedical,
  defaultValuesNurse,
  schema,
} from '../../../MedicalRecord/add/types'

export const AddMedicalRecordForm = ({ hasScheduledAppointmentId }: AddMedicalRecordProps) => {
  const router = useRouter()
  const appointmentId = Number(router.query.id)
  const { auth } = useAuth()
  const isSmallDevice = useMediaQuery('sm')
  const addMedicalRecord = useMutateAddMedicalRecord()
  const { appointment } = useFetchReadAppointment({ appointmentId })
  const { params, setParams } = useParams()
  const isMedical = auth?.user?.isMedical
  const { setQueryParam } = useUrlQueryControl({
    queryName: 'recordType',
  })
  const isVideoCall = router.route.includes('call')
  const { getCount, resetCounting } = usePageTimeCounter()
  const posthog = usePostHog()

  const { handleSubmit, getValues, reset, watch, ...others } = useForm({
    defaultValues: isMedical ? defaultValuesMedical : defaultValuesNurse,
    resolver: yupResolver(
      schema.shape({
        exam: !!appointment?.scheduledAppointmentId ? yup.string() : yup.string().required(),
        diagnose: schemaDiagnose.shape({
          cidId: yup.string().optional(),
        }),
      }),
    ),
  })
  const classification = watch('classification')
  const diagnoseExternal = watch('diagnose.diagnoseExternal')
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

  const handleSubmitError = () => {
    if (!classification) {
      setParams({ classificationIsNull: true })
    }
  }

  const onCancel = () => {
    isSmallDevice
      ? setQueryParam(null)
      : reset(isMedical ? defaultValuesMedical : defaultValuesNurse)
  }

  const onFinish = async () => {
    const isValid = await others.trigger()
    const { diagnose, ...body } = getValues()

    if (!isValid) return

    await addMedicalRecord
      .mutateAsync({
        ...body,
        appointmentId,
        classification: body.classification as MedicalRecordClassification,
        diastolic: Number(body.diastolic),
        systolic: Number(body.systolic),
        heartRate: Number(body.heart_rate),
        oxygenSaturation: Number(body.oxygen_saturation),
        respiratoryFrequency: Number(body.respiratory_frequency),
        certificationPassword: body.certificatePass || params?.certificatePass,
        bodyTemperature: Number(body.body_temperature),
        diagnose: diagnose.cidId
          ? {
              cidId: diagnose.cidId,
              date: diagnose.date,
              diagnoseExternal: diagnose.diagnoseExternal === 'true',
              type: diagnose.type,
              externalDocCRM: diagnose.externalDocCRM,
              externalDocName: diagnose.externalDocName,
            }
          : undefined,
      })
      .then((medicalRecord) => {
        const path = isVideoCall
          ? `${NEW_ROUTES.AUTHENTICATED.APPOINTMENT.CALL.path}?tab=0`
          : `${NEW_ROUTES.AUTHENTICATED.APPOINTMENT.VIEW.path}?tab=0&recordId=${medicalRecord.id}&type=${RecordsType.MEDICAL_RECORDS}`

        posthog.capture('user_add_medical_record', {
          time_spent: getCount(),
        })
        resetCounting()

        router.push(bindPathParams(path, { id: appointmentId }), undefined, { shallow: true })
      })
  }

  return (
    <CForm
      form={{ handleSubmit, getValues, reset, watch, ...others }}
      onSubmit={onSubmit}
      id='myForm'
    >
      {addMedicalRecord.errorMessage && (
        <Box my={2}>
          <Alert severity='error'>{addMedicalRecord.errorMessage}</Alert>
        </Box>
      )}
      <MedicalRecordForm
        error={addMedicalRecord.errorMessage || undefined}
        isScheduled={hasScheduledAppointmentId}
        onSubmit={handleSubmit(() => onSubmit())}
        isMedical={isMedical}
        isSmallDevice={isSmallDevice}
        isAppointmentResume={isVideoCall}
        handleSubmitError={handleSubmitError}
        onCancel={onCancel}
        diagnoseExternal={diagnoseExternal === 'true'}
      />
      <ComplaintModal open={showModal} onClose={() => setShowModal(false)} onFinish={onFinish} />
    </CForm>
  )
}

export default AddMedicalRecordForm
