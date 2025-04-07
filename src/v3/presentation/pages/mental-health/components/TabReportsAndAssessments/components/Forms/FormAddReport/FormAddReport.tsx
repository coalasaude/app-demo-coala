import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Divider, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { SubmitHandler, useForm } from 'react-hook-form'
import { usePostHog } from 'posthog-js/react'

import { CDatePickerControlled, CForm, CSelectControlled } from '@/components/Forms'
import { GridItem, GridWrapper } from '@/components/Grid'
import { medicalProfileTranslate } from '@/v3/domain/@v2/mental-health/enums/medicalProfileTypes.enum'
import { FormButtons } from '@/v3/presentation/components/FormButtons'
import { ModalCard, useModalContext } from '@/v3/presentation/components/Modal'
import { useMutateAddMentalHealthDocument } from '@/v3/presentation/hooks/api/@v2/mental-health/documents/useMutateAddMentalHealthDocument'
import { useMutateAddMentalHealthReport } from '@/v3/presentation/hooks/api/@v2/mental-health/reports/report/useMutateAddMentalHealthReport'
import { useFetchBrowseReportProfiles } from '@/v3/presentation/hooks/api/@v2/mental-health/reports/useFetchBrowseReportProfiles'
import { CInputControlled } from '@/v3/presentation/newComponents'
import { CFileInputAsyncControlled } from '@/v3/presentation/newComponents/implementations/form/CFileInputAsyncControlled'
import { MAX_ACCEPTED_DATE, MIN_ACCEPTED_USER_DATE } from '@/v3/utils/accept-date'
import { usePageTimeCounter } from '@/v3/presentation/hooks/usePageTimeCounter'
import {
  buildPath,
  POSTHOG_ACTIONS,
  POSTHOG_EVENTS,
} from '@/v3/presentation/constants/posthog-events.constants'

import { initialValuesReport, IReportFormFields, schemaReport } from './schema'
import { IFormAddReportProps } from './types'

export function FormAddReport({ userId }: IFormAddReportProps) {
  const posthog = usePostHog()
  const { handleModal } = useModalContext()
  const form = useForm({
    resolver: yupResolver(schemaReport),
    defaultValues: initialValuesReport,
  })
  const { getCount } = usePageTimeCounter()
  const addDocument = useMutateAddMentalHealthDocument()
  const addReport = useMutateAddMentalHealthReport()

  const { profiles } = useFetchBrowseReportProfiles()

  const handleAsyncUpload = async (file: File) => {
    const document = await addDocument.mutateAsync({
      file,
      userId: userId,
    })

    return document.id
  }

  const onClose = () => {
    handleModal()
  }

  const onSubmit: SubmitHandler<IReportFormFields> = async (values) => {
    addReport
      .mutateAsync({
        documentId: Number(values.file.id),
        userId: userId,
        emissionDate: values.emissionDate,
        documentName: values.name,
        registration: values.professionalRegister,
        professionalName: values.professionalName,
        professionalRegistrationId: values.professionalType,
      })
      .finally(onClose)

    posthog.capture(buildPath(POSTHOG_EVENTS.LEARNING.MEDICAL_REPORT, POSTHOG_ACTIONS.CREATED), {
      time_on_page: getCount(),
    })
  }

  const selectProfiles =
    profiles?.data.map((profile) => ({
      value: profile.id,
      label: medicalProfileTranslate[profile.name],
    })) || []

  return (
    <ModalCard title='Adicionar documento' sx={{ width: ['100%', 532] }}>
      <CForm id='myForm' form={form} onSubmit={onSubmit}>
        <Box mt={1}>
          <GridWrapper>
            <GridItem xs={12}>
              <Typography mb={1} variant='h4'>
                Nome do documento*
              </Typography>
              <CInputControlled label='' name='name' placeholder='Digite aqui' fullWidth />
            </GridItem>
            <GridItem xs={12}>
              <Typography mb={1} variant='h4'>
                Nome do profissional*
              </Typography>
              <CInputControlled
                label=''
                name='professionalName'
                placeholder='Digite aqui'
                fullWidth
              />
            </GridItem>
            <GridItem xs={12}>
              <Typography mb={1} variant='h4'>
                Tipo de profissional*
              </Typography>
              <CSelectControlled
                name='professionalType'
                label='Selecione o tipo de profissional'
                disabledNullOption
                fullWidth
                options={selectProfiles}
              />
            </GridItem>
            <GridItem xs={12}>
              <Typography mb={1} variant='h4'>
                Número de registro do profissional*
              </Typography>
              <CInputControlled
                label=''
                name='professionalRegister'
                placeholder='Digite o número de registro'
                fullWidth
              />
            </GridItem>
            <GridItem xs={12}>
              <Typography mb={1} variant='h4'>
                Data de emissão do documento*
              </Typography>
              <CDatePickerControlled
                name={'emissionDate'}
                label=''
                placeholder='Selecione a data'
                maxDate={dayjs(MAX_ACCEPTED_DATE)}
                minDate={dayjs(MIN_ACCEPTED_USER_DATE)}
              />
            </GridItem>
            <GridItem xs={12}>
              <Typography mb={1} variant='h4'>
                Arquivo*
              </Typography>
              <CFileInputAsyncControlled
                placeholder='Selecione um arquivo'
                label=''
                accept='*'
                name={'file'}
                onUploadFunc={handleAsyncUpload}
              />
            </GridItem>
          </GridWrapper>
          <Divider sx={{ display: ['flex', 'none'], mb: 3, mt: 2 }} />
          <FormButtons
            display='flex'
            mt={[0, 4]}
            justifyContent='flex-end'
            confirmLabel='Concluir'
            cancelLabel={'Cancelar'}
            isLoading={false}
            disableConfirm={false}
            onCancel={onClose}
            minWidth={['100%', 100]}
          />
        </Box>
      </CForm>
    </ModalCard>
  )
}
