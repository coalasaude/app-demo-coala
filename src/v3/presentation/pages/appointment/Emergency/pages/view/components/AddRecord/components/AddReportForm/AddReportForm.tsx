import { Box } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { GridItem, GridWrapper } from '@/components/Grid'
import { CInputControlled, CTextAreaControlled } from '@/v3/presentation/newComponents'
import { CForm } from '@/components/Forms'
import { FormButtons } from '@/v3/presentation/components/FormButtons'
import { useBreakpoint } from '@/hooks/useBreakpoints'
import { useUrlQueryControl } from '@/v3/presentation/hooks/useUrlQueryControl'
import { bindPathParams } from '@/utils/bindParams'
import { NEW_ROUTES } from '@/constants/routes'
import { useMutateAddReport } from '@/v3/presentation/hooks/api/@v2/appointment/report/useMutateAddReport'
import { RecordsType } from '@/types/records'
import { useParams } from '@/hooks/useParams'
import { useFetchBrowseTimeline } from '@/v3/presentation/hooks/api/@v2/appointment/appointment/useFetchBrowseTimeline'
import { ComplaintModal } from '@/v3/presentation/pages/mental-health/pages/session/components/ModalCertificate/OnlyComplaintModal'

import { initialValues, schema } from '../../../Report/add/schema'
import { WrapperButtonsForm } from '../WrapperButtonsForm'
import ButtonWrapperVideoCall from '../../../../../call/components/ButtonWrapperVideoCall'

export const AddReportForm = () => {
  const router = useRouter()
  const appointmentId = Number(router.query.id)
  const isVideoCall = router.route.includes('call')
  const { params } = useParams()
  const form = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  })
  const addReport = useMutateAddReport()
  const isSmallDevice = useBreakpoint('sm')
  const { setQueryParam } = useUrlQueryControl({
    queryName: 'recordType',
  })
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
    const body = form.getValues()

    const report = await addReport.mutateAsync({
      appointmentId,
      body: body.body,
      certificationPassword: body.certificatePass || params?.certificatePass,
      title: body.title,
    })

    const path = isVideoCall
      ? `${NEW_ROUTES.AUTHENTICATED.APPOINTMENT.CALL.path}?tab=0`
      : `${NEW_ROUTES.AUTHENTICATED.APPOINTMENT.VIEW.path}?tab=0&recordId=${report.id}&type=${RecordsType.REPORTS}`

    await router.push(bindPathParams(path, { id: appointmentId }), undefined, { shallow: true })
  }

  const onCancel = () => {
    isSmallDevice ? setQueryParam(null) : form.reset(initialValues)
  }

  return (
    <CForm form={form} onSubmit={onSubmit} id='myForm'>
      <GridWrapper mt={1}>
        <GridItem xs={12} md={6}>
          <CInputControlled
            variant='outlined'
            placeholder='Digite o título'
            name='title'
            label='Título'
          />
        </GridItem>
      </GridWrapper>
      <Box mt={2} />
      <GridWrapper>
        <GridItem xs={12}>
          <CTextAreaControlled
            placeholder='Digite o corpo do texto'
            name='body'
            variant='outlined'
            label='Corpo do texto'
          />
        </GridItem>
      </GridWrapper>

      <Wrapper>
        <FormButtons
          display='flex'
          mt={[0, 2]}
          justifyContent='flex-end'
          confirmLabel='Registrar'
          cancelLabel={isSmallDevice ? 'Cancelar' : 'Limpar'}
          isLoading={addReport.isPending}
          onCancel={onCancel}
          minWidth={['100%', 100]}
          cancelVariant='text'
        />
      </Wrapper>

      <ComplaintModal open={showModal} onClose={() => setShowModal(false)} onFinish={onFinish} />
    </CForm>
  )
}

export default AddReportForm
