import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Grid } from '@mui/material'
import dayjs from 'dayjs'
import Router, { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import { CAutoComplete, CDatePickerControlled, CForm } from '@/components/Forms'
import { onlyNumsNormalizer } from '@/components/Forms/normalizers/onlyNumsNormalizer'
import { GridItem, GridWrapper } from '@/components/Grid'
import { ViewSkeleton } from '@/components/Skeletons/ViewSkeleton'
import { spacing } from '@/utils/spacing'
import { AddHistorySickNoteParams } from '@/v3/infra/services/@v2/health-history/sick-note/add-sick-note'
import { CBaseContainer } from '@/v3/presentation/components/CBaseContainer'
import { useMutateAddHistorySickNote } from '@/v3/presentation/hooks/api/@v2/health-history/sick-note/useMutateAddSickNote'
import { CContainerContent, CInputControlled, PageHeader } from '@/v3/presentation/newComponents'
import { CFileInputControlled } from '@/v3/presentation/newComponents/implementations/form/CFileInputControlled'
import CSwitchControlled from '@/v3/presentation/newComponents/implementations/form/CSwitchControlled'
import CTimePickerControlled from '@/v3/presentation/newComponents/implementations/form/CTimePickerControlled'
import { useFetchBrowseSickNoteCidOptions } from '@/v3/presentation/hooks/api/@v2/health-history/sick-note/useFetchBrowseSickNoteCidOptions'

import { IDiseaseFormFields, initialValues, schema } from './schema'

export const SickNoteAddPage = () => {
  const router = useRouter()
  const userId = Number(router.query.userId as string)
  const { sickNoteOptions, setSearch } = useFetchBrowseSickNoteCidOptions()

  const { mutateAsync: createHistorySickNoteMutate, isPending: isLoadingHistorySickNote } =
    useMutateAddHistorySickNote()

  const cidOptionsProp =
    sickNoteOptions?.data?.map((cid) => {
      const value = cid.label

      return {
        value: value,
        label: value,
      }
    }) || []

  const onSubmit = async (data: {
    dateAppointment: Date
    diagnose: string
    document: File
    haveDiagnose: boolean
    hourAppointment: Date
    sickNoteDays: string
  }) => {
    if (!userId) return
    const combinedAppointmentDate = new Date(
      new Date(data.dateAppointment).getFullYear(),
      new Date(data.dateAppointment).getMonth(),
      new Date(data.dateAppointment).getDate(),
      new Date(data.hourAppointment).getHours(),
      new Date(data.hourAppointment).getMinutes(),
      new Date(data.hourAppointment).getSeconds(),
    )
    const payload: AddHistorySickNoteParams = {
      appointmentDate: combinedAppointmentDate,
      file: data.document,
      userId: userId,
      validUntil: dayjs(combinedAppointmentDate).add(Number(data.sickNoteDays), 'days').toDate(),
    }

    if (data.haveDiagnose) {
      payload.description = data.diagnose
    }

    await createHistorySickNoteMutate({
      ...payload,
      userId: userId,
    })
    Router.back()
  }

  const form = useForm<IDiseaseFormFields>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  })

  const { watch } = form

  const haveDiagnose = watch('haveDiagnose')

  return (
    <>
      <PageHeader title='Cadastro de atestado' />
      <CForm id='myForm' form={form} onSubmit={onSubmit}>
        <Box>
          {!cidOptionsProp ? (
            <ViewSkeleton />
          ) : (
            <>
              <CBaseContainer
                buttonLabel='Cadastrar'
                buttonDisabled={!form.formState.isDirty}
                isLoading={isLoadingHistorySickNote}
              >
                <CContainerContent title='Atestado'>
                  <GridWrapper spacing={spacing(4)}>
                    <GridItem xs={12} md={6}>
                      <CFileInputControlled
                        name='document'
                        label='Selecione o atestado médico*'
                        accept='.pdf, image/*'
                      />
                    </GridItem>
                    <GridItem xs={0} md={6} display={['none', 'none', 'inherit']} />
                    <GridItem xs={12} md={12}>
                      <Grid container spacing={2}>
                        <GridItem xs={6} md={4}>
                          <CDatePickerControlled
                            name='dateAppointment'
                            label='Data do atendimento*'
                            maxDate={dayjs()}
                          />
                        </GridItem>
                        <GridItem xs={6} md={4}>
                          <CTimePickerControlled
                            name='hourAppointment'
                            label='Hora do atendimento*'
                          />
                        </GridItem>
                      </Grid>
                    </GridItem>
                    <GridItem xs={12} md={4}>
                      <CInputControlled
                        placeholder='Digite os dias de atestado*'
                        name='sickNoteDays'
                        label='Dias de atestado*'
                        transform={{
                          input: [onlyNumsNormalizer],
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12}>
                      <CSwitchControlled label='Atestado incluiu diagnóstico' name='haveDiagnose' />
                    </GridItem>
                    {haveDiagnose && (
                      <GridItem xs={12} md={6}>
                        <CAutoComplete
                          name='diagnose'
                          label='Diagnóstico'
                          fullWidth
                          options={cidOptionsProp}
                          onInputChange={(e, value, reason) => {
                            if (reason === 'input') setSearch(value)
                            if (reason === 'input' && !value) setSearch('')
                          }}
                        />
                      </GridItem>
                    )}
                    <GridItem xs={0} md={6} />
                  </GridWrapper>
                </CContainerContent>
              </CBaseContainer>
            </>
          )}
        </Box>
      </CForm>
    </>
  )
}
