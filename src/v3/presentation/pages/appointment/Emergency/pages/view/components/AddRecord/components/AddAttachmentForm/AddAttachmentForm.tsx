import { yupResolver } from '@hookform/resolvers/yup'
import { Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import { CForm } from '@/components/Forms'
import { maxLength } from '@/components/Forms/normalizers/maxLengthNormalizer'
import { GridItem, GridWrapper } from '@/components/Grid'
import { NEW_ROUTES } from '@/constants/routes'
import useMediaQuery from '@/hooks/useMediaQuery'
import { bindPathParams } from '@/utils/bindParams'
import { FormButtons } from '@/v3/presentation/components/FormButtons'
import { useMutateAddAttachmentDocument } from '@/v3/presentation/hooks/api/@v2/appointment/attachment/useMutateAddAttachmentDocument'
import { useMutateAddAttachment } from '@/v3/presentation/hooks/api/@v2/appointment/attachment/useMutateAddAttachment'
import { useUrlQueryControl } from '@/v3/presentation/hooks/useUrlQueryControl'
import { CInputControlled } from '@/v3/presentation/newComponents'
import { CFileInputAsyncControlled } from '@/v3/presentation/newComponents/implementations/form/CFileInputAsyncControlled'
import { FileAsync } from '@/types/FileAsync'
import { RecordsType } from '@/types/records'

import { initialValues, schema } from '../../../Attachments/add/schema'
import { WrapperButtonsForm } from '../WrapperButtonsForm'
import ButtonWrapperVideoCall from '../../../../../call/components/ButtonWrapperVideoCall'

export const AddAttachmentForm = () => {
  const router = useRouter()
  const appointmentId = Number(router.query.id)
  const isVideoCall = router.route.includes('call')

  const isSmallDevice = useMediaQuery('sm')
  const addDocument = useMutateAddAttachmentDocument()
  const addAttachment = useMutateAddAttachment()
  const form = useForm({ defaultValues: initialValues, resolver: yupResolver(schema) })
  const { setQueryParam } = useUrlQueryControl({
    queryName: 'recordType',
  })

  const Wrapper = isVideoCall ? ButtonWrapperVideoCall : WrapperButtonsForm

  const onSubmit = async (body: { title: string; file: FileAsync }) => {
    const attachment = await addAttachment.mutateAsync({
      appointmentId,
      documentId: Number(body.file.id),
      title: body.title,
    })

    const path = isVideoCall
      ? `${NEW_ROUTES.AUTHENTICATED.APPOINTMENT.CALL.path}?tab=0`
      : `${NEW_ROUTES.AUTHENTICATED.APPOINTMENT.VIEW.path}?tab=0&recordId=${attachment.id}&type=${RecordsType.ATTACHMENTS}`

    await router.push(bindPathParams(path, { id: appointmentId }), undefined, { shallow: true })
  }

  const handleAsyncUpload = async (file: File) => {
    const document = await addDocument.mutateAsync({
      file,
      appointmentId,
    })

    return document.id
  }

  const onCancel = () => {
    isSmallDevice ? setQueryParam(null) : form.reset(initialValues)
  }

  return (
    <CForm form={form} onSubmit={onSubmit} id='myForm'>
      <GridWrapper mt={1}>
        <GridItem py={2} xs={12}>
          <CInputControlled
            placeholder='Digite o nome do anexo'
            name='title'
            variant='outlined'
            label='Nome do anexo'
            transform={{ output: [maxLength(150)] }}
          />
        </GridItem>
        <GridItem py={2} xs={12}>
          <Typography variant='h3'>Arquivos</Typography>
        </GridItem>
        <GridItem py={2} xs={6}>
          <CFileInputAsyncControlled
            name='file'
            label='Selecione um documento relacionado'
            accept='.jpeg,.jpg,.png,.jpe,.bmp,.pdf'
            onUploadFunc={handleAsyncUpload}
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
          isLoading={addAttachment.isPending || addDocument.isPending}
          onCancel={onCancel}
          minWidth={['100%', 100]}
          cancelVariant='text'
        />
      </Wrapper>
    </CForm>
  )
}

export default AddAttachmentForm
