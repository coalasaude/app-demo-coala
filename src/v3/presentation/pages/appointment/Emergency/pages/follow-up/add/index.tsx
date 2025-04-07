import { useForm } from 'react-hook-form'
import { Alert, Box } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'

import { CForm } from '@/components/Forms/Form'
import { useFetchAppointment } from '@/v3/presentation/hooks/useFetchAppointment'
import { useMutateFollowUp } from '@/v3/presentation/hooks/api/appointment/followUp/useMutateFollowUp'

import RegisterAddWrapper from '../../view/components/Desktop/RegisterAddWrapper'

import { FollowUpForm } from './components/FollowUpForm'
import FooterButtons from './components/FooterButton'
import { initialValues, schema } from './types'

export const AddFollowUp = () => {
  const { handleSubmit, getValues, ...others } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  })
  const router = useRouter()
  const appointmentId = Number(router.query.id)
  const { appointmentData } = useFetchAppointment(appointmentId)
  const { addFollowUp, error } = useMutateFollowUp()

  const onSubmit = async (modalValues: typeof schema) => {
    const body = {
      ...getValues(),
      ...modalValues,
    }

    await addFollowUp({
      appointmentId,
      body,
    })
  }

  return (
    <RegisterAddWrapper title='Novo acompanhamento'>
      {error && (
        <Box my={2}>
          <Alert severity='error'>{error}</Alert>
        </Box>
      )}
      <CForm form={{ handleSubmit, getValues, ...others }} onSubmit={onSubmit}>
        <FollowUpForm error={error} appointmentData={appointmentData?.data} />
      </CForm>
      <FooterButtons handleSubmit={handleSubmit} onSubmit={onSubmit} />
    </RegisterAddWrapper>
  )
}

export default AddFollowUp
