import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import dayjs from 'dayjs'
import { useState } from 'react'

import { onlyNumsNormalizer } from '@/components/Forms/normalizers/onlyNumsNormalizer'
import { GridItem, GridWrapper } from '@/components/Grid'
import { maxLength } from '@/components/Forms/normalizers/maxLengthNormalizer'
import { CInputControlled, CTextAreaControlled } from '@/v3/presentation/newComponents'
import { CForm } from '@/components/Forms'
import { FormButtons } from '@/v3/presentation/components/FormButtons'
import { useUrlQueryControl } from '@/v3/presentation/hooks/useUrlQueryControl'
import { useBreakpoint } from '@/hooks/useBreakpoints'
import { bindPathParams } from '@/utils/bindParams'
import { NEW_ROUTES } from '@/constants/routes'
import { useMutateAddExam } from '@/v3/presentation/hooks/api/@v2/appointment/exam/useMutateAddExam'
import { RecordsType } from '@/types/records'
import { useParams } from '@/hooks/useParams'
import { useFetchBrowseTimeline } from '@/v3/presentation/hooks/api/@v2/appointment/appointment/useFetchBrowseTimeline'
import { ComplaintModal } from '@/v3/presentation/pages/mental-health/pages/session/components/ModalCertificate/OnlyComplaintModal'

import { initialValues, schema } from '../../../Exam/add/schema'
import { WrapperButtonsForm } from '../WrapperButtonsForm'
import ButtonWrapperVideoCall from '../../../../../call/components/ButtonWrapperVideoCall'

export const AddExamForm = () => {
  const router = useRouter()
  const appointmentId = Number(router.query.id)
  const form = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  })
  const { setQueryParam } = useUrlQueryControl({
    queryName: 'recordType',
  })
  const isSmallDevice = useBreakpoint('sm')
  const addExam = useMutateAddExam()
  const isVideoCall = router.route.includes('call')
  const Wrapper = isVideoCall ? ButtonWrapperVideoCall : WrapperButtonsForm
  const { params } = useParams()
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

    const exam = await addExam.mutateAsync({
      appointmentId,
      certificationPassword: body.certificatePass || params?.certificatePass,
      description: body.description,
      recommendation: body.recommendation,
      validUntil: dayjs().add(Number(body.valid_until), 'day').toDate(),
    })

    const path = isVideoCall
      ? `${NEW_ROUTES.AUTHENTICATED.APPOINTMENT.CALL.path}?tab=0`
      : `${NEW_ROUTES.AUTHENTICATED.APPOINTMENT.VIEW.path}?tab=0&recordId=${exam.id}&type=${RecordsType.EXAM}`

    await router.push(bindPathParams(path, { id: appointmentId }), undefined, { shallow: true })
  }

  const onCancel = () => {
    isSmallDevice ? setQueryParam(null) : form.reset(initialValues)
  }

  return (
    <CForm form={form} onSubmit={onSubmit} id='myForm'>
      <GridWrapper mt={1}>
        <GridItem pb={2} xs={12} md={4}>
          <CInputControlled
            name='valid_until'
            variant='outlined'
            placeholder='Digite a validade'
            label='Validade (dias)'
            transform={{
              input: [onlyNumsNormalizer],
              output: [maxLength(2)],
            }}
          />
        </GridItem>
        <GridItem pb={2} xs={12}>
          <CTextAreaControlled
            name='description'
            placeholder='Digite a descrição '
            variant='outlined'
            label='Descrição'
          />
        </GridItem>
        <GridItem pb={2} xs={12}>
          <CTextAreaControlled
            placeholder='Digite a indicação'
            name='recommendation'
            variant='outlined'
            label='Indicação'
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
          isLoading={addExam.isPending}
          onCancel={onCancel}
          minWidth={['100%', 100]}
          cancelVariant='text'
        />
      </Wrapper>

      <ComplaintModal open={showModal} onClose={() => setShowModal(false)} onFinish={onFinish} />
    </CForm>
  )
}

export default AddExamForm
