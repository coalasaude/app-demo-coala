import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Box, Typography } from '@mui/material'
import dayjs from 'dayjs'

import { CForm } from '@/components/Forms/Form'
import { maxLength } from '@/components/Forms/normalizers/maxLengthNormalizer'
import { GridItem, GridWrapper } from '@/components/Grid'
import {
  CInputControlled,
  CRadioButtonGroupControlled,
  CTextAreaControlled,
} from '@/v3/presentation/newComponents'
import { onlyNumsNormalizer } from '@/components/Forms/normalizers/onlyNumsNormalizer'
import { FormButtons } from '@/v3/presentation/components/FormButtons'
import { useBreakpoint } from '@/hooks/useBreakpoints'
import { useUrlQueryControl } from '@/v3/presentation/hooks/useUrlQueryControl'
import { bindPathParams } from '@/utils/bindParams'
import { NEW_ROUTES } from '@/constants/routes'
import { useMutateAddSickNote } from '@/v3/presentation/hooks/api/@v2/appointment/sick-note/useMutateAddSickNote'
import { RecordsType } from '@/types/records'
import { useFetchBrowseTimeline } from '@/v3/presentation/hooks/api/@v2/appointment/appointment/useFetchBrowseTimeline'
import { ComplaintModal } from '@/v3/presentation/pages/mental-health/pages/session/components/ModalCertificate/OnlyComplaintModal'

import { initialValues, schema } from '../../../SickNote/add/schema'
import FilterCid from '../../../Cid/add/components/FilterCid'
import { WrapperButtonsForm } from '../WrapperButtonsForm'
import ButtonWrapperVideoCall from '../../../../../call/components/ButtonWrapperVideoCall'

const currentDate = dayjs()

export const AddSickNoteForm = () => {
  const form = useForm({ defaultValues: initialValues, resolver: yupResolver(schema) })
  const [useCid, setUseCid] = useState('false')
  const router = useRouter()
  const isSmallDevice = useBreakpoint('sm')
  const appointmentId = Number(router.query.id)
  const isVideoCall = router.route.includes('call')
  const addSickNote = useMutateAddSickNote()
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
    const data = { ...form.getValues() }

    const sickNote = await addSickNote.mutateAsync({
      appointmentId,
      cidId: data.cidId,
      certificationPassword: data.certificatePass,
      validUntil: dayjs().add(Number(data.validUntil), 'day').toDate(),
      body: data.preDescription
        .replace(/\[DATA_ATENDIMENTO\]/g, currentDate.format('DD/MM/YYYY'))
        .replace(/\[DIAS_ATESTADOS\]/g, data.validUntil),
    })

    const path = isVideoCall
      ? `${NEW_ROUTES.AUTHENTICATED.APPOINTMENT.CALL.path}?tab=0`
      : `${NEW_ROUTES.AUTHENTICATED.APPOINTMENT.VIEW.path}?tab=0&recordId=${sickNote.id}&type=${RecordsType.SICKNOTE}`

    await router.push(bindPathParams(path, { id: appointmentId }), undefined, { shallow: true })
  }

  const onCancel = () => {
    isSmallDevice ? setQueryParam(null) : form.reset(initialValues)
  }

  return (
    <CForm form={form} onSubmit={onSubmit} id='myForm'>
      <GridWrapper width='100%' mt={1}>
        <GridItem xs={12} md={4}>
          <CInputControlled
            variant='outlined'
            name='validUntil'
            placeholder='Dias de atestado'
            label='Dias de atestado'
            transform={{ input: [onlyNumsNormalizer], output: [maxLength(2)] }}
          />
        </GridItem>
      </GridWrapper>
      <Box my={2}>
        <Typography variant='h5'>Divulgação do CID-10 autorizada?</Typography>
        <CRadioButtonGroupControlled
          row
          name='useCid'
          options={[
            { value: 'true', label: 'Sim' },
            { value: 'false', label: 'Não' },
          ]}
          onChange={(e) => setUseCid(e.target.value)}
        />
      </Box>
      {useCid === 'true' && (
        <GridWrapper>
          <GridItem xs={12}>
            <FilterCid />
          </GridItem>
        </GridWrapper>
      )}

      <GridWrapper>
        <GridItem xs={12}>
          <CTextAreaControlled
            variant='outlined'
            name='preDescription'
            placeholder='Digite a descrição do atestado'
            label='Descrição'
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
          isLoading={addSickNote.isPending}
          onCancel={onCancel}
          minWidth={['100%', 100]}
          cancelVariant='text'
        />
      </Wrapper>

      <ComplaintModal open={showModal} onClose={() => setShowModal(false)} onFinish={onFinish} />
    </CForm>
  )
}

export default AddSickNoteForm
