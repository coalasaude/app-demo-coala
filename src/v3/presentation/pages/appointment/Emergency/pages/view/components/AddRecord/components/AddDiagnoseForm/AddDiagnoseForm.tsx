import { yupResolver } from '@hookform/resolvers/yup'
import { Alert, Box } from '@mui/material'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

import { CForm } from '@/components/Forms'
import { NEW_ROUTES } from '@/constants/routes'
import DiagnoseForm from '@/containers/Appointment/Emergency/cid/add/components/DiagnoseForm'
import {
  TAddDiagnose,
  initialDiagnoseValues,
  schemaDiagnose,
} from '@/containers/Appointment/Emergency/cid/add/types'
import { useBreakpoint } from '@/hooks/useBreakpoints'
import { RecordsType } from '@/types/records'
import { bindPathParams } from '@/utils/bindParams'
import { FormButtons } from '@/v3/presentation/components/FormButtons'
import { useMutateAddDiagnose } from '@/v3/presentation/hooks/api/@v2/appointment/diagnose/useMutateAddDiagnose'
import { useUrlQueryControl } from '@/v3/presentation/hooks/useUrlQueryControl'
import { useFetchBrowseTimeline } from '@/v3/presentation/hooks/api/@v2/appointment/appointment/useFetchBrowseTimeline'
import { ComplaintModal } from '@/v3/presentation/pages/mental-health/pages/session/components/ModalCertificate/OnlyComplaintModal'

import { WrapperButtonsForm } from '../WrapperButtonsForm'
import ButtonWrapperVideoCall from '../../../../../call/components/ButtonWrapperVideoCall'

export const AddDiagnoseForm = () => {
  const router = useRouter()
  const isSmallDevice = useBreakpoint('sm')
  const appointmentId = Number(router.query.id)
  const addDiagnose = useMutateAddDiagnose()

  const { setQueryParam } = useUrlQueryControl({
    queryName: 'recordType',
  })

  const { handleSubmit, getValues, watch, reset, ...others } = useForm<TAddDiagnose>({
    defaultValues: initialDiagnoseValues,
    resolver: yupResolver(schemaDiagnose),
  })
  const diagnoseExternal = watch('diagnoseExternal')
  const isVideoCall = router.route.includes('call')
  const Wrapper = isVideoCall ? ButtonWrapperVideoCall : WrapperButtonsForm

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
    const isValid = await others.trigger()

    if (!isValid) return
    if (!appointmentId) return

    const values = getValues()

    const diagnose = await addDiagnose.mutateAsync({
      date: values.date,
      diagnoseExternal: values.diagnoseExternal.toString() === 'true' ? true : false,
      appointmentId,
      type: values.type,
      externalDocCRM: values.externalDocCRM,
      externalDocName: values.externalDocName,
      cidId: values.cidId,
    })

    const path = isVideoCall
      ? `${NEW_ROUTES.AUTHENTICATED.APPOINTMENT.CALL.path}?tab=0`
      : `${NEW_ROUTES.AUTHENTICATED.APPOINTMENT.VIEW.path}?tab=0&recordId=${diagnose.id}&type=${RecordsType.APPOINTMENT_DIAGNOSE}`

    await router.push(bindPathParams(path, { id: appointmentId }), undefined, { shallow: true })
  }

  const onCancel = () => {
    isSmallDevice ? setQueryParam(null) : reset(initialDiagnoseValues)
  }

  return (
    <Box mt={2}>
      {!!addDiagnose.errorMessage && (
        <Box my={2}>
          <Alert severity='error'>{addDiagnose.errorMessage}</Alert>
        </Box>
      )}
      <CForm form={{ handleSubmit, getValues, watch, reset, ...others }} onSubmit={onSubmit}>
        <DiagnoseForm diagnoseExternal={diagnoseExternal === 'true'} />

        <ComplaintModal open={showModal} onClose={() => setShowModal(false)} onFinish={onFinish} />
      </CForm>

      <Wrapper>
        <FormButtons
          display='flex'
          mt={[0, 2]}
          justifyContent='flex-end'
          confirmLabel='Registrar'
          onConfirm={onSubmit}
          cancelLabel={isSmallDevice ? 'Cancelar' : 'Limpar'}
          onCancel={onCancel}
          minWidth={['100%', 100]}
          cancelVariant='text'
        />
      </Wrapper>
    </Box>
  )
}

export default AddDiagnoseForm
