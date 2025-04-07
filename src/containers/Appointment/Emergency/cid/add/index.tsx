import { yupResolver } from '@hookform/resolvers/yup'
import { Alert, Box } from '@mui/material'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import { CForm } from '@/components/Forms'
import Paper from '@/v3/presentation/components/Paper'
import { useMutateAddDiagnose } from '@/v3/presentation/hooks/api/@v2/appointment/diagnose/useMutateAddDiagnose'
import { PageHeader } from '@/v3/presentation/newComponents'

import DiagnoseForm from './components/DiagnoseForm'
import { TAddDiagnose, initialDiagnoseValues, schemaDiagnose } from './types'

export const AddCidAppointment = ({ isAppointmentResume }: { isAppointmentResume?: boolean }) => {
  const { handleSubmit, getValues, watch, ...others } = useForm<TAddDiagnose>({
    defaultValues: initialDiagnoseValues,
    resolver: yupResolver(schemaDiagnose),
  })
  const router = useRouter()
  const appointmentId = Number(router.query.id)
  const diagnoseExternal = watch('diagnoseExternal')
  const addDiagnose = useMutateAddDiagnose()

  const onSubmit = async (values: TAddDiagnose) => {
    if (!appointmentId) return

    await addDiagnose.mutateAsync({
      date: values.date,
      diagnoseExternal: values.diagnoseExternal.toString() === 'true' ? true : false,
      appointmentId,
      type: values.type,
      externalDocCRM: values.externalDocCRM,
      externalDocName: values.externalDocName,
      cidId: values.cidId,
    })
  }

  const Wrapper = isAppointmentResume ? Box : Paper
  return (
    <>
      {!isAppointmentResume && (
        <PageHeader
          title='Adicionar diagnóstico'
          actionButtonProps={{
            variant: 'contained',
            onClick: handleSubmit(onSubmit),
            children: 'Cadastrar',
          }}
        />
      )}
      {!!addDiagnose.errorMessage && (
        <Box my={2}>
          <Alert severity='error'>{addDiagnose.errorMessage}</Alert>
        </Box>
      )}
      <Wrapper px={isAppointmentResume ? 2 : 0}>
        <CForm form={{ handleSubmit, getValues, watch, ...others }} onSubmit={onSubmit}>
          <DiagnoseForm diagnoseExternal={diagnoseExternal === 'true'} />
        </CForm>
      </Wrapper>
    </>
  )
}

export default AddCidAppointment
