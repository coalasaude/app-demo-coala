import { FormProvider, useForm } from 'react-hook-form'

import AppointmentMentalHealthAppBar from '../../components/AppointmentMentalHealthAppBar'
import { MentalHealthProvider } from '../../contexts/mental-health.provider'

import CreateMentalHealthForm from './components/createMentalHealthForm'

export default function AppointmentMentalHealth() {
  const methods = useForm()

  return (
    <MentalHealthProvider>
      <AppointmentMentalHealthAppBar />
      <FormProvider {...methods}>
        <CreateMentalHealthForm />
      </FormProvider>
    </MentalHealthProvider>
  )
}
