import { Button, DialogTitle } from '@mui/material'
import { useForm } from 'react-hook-form'

import { useModalContext } from '@/v3/presentation/components/Modal'
import { GridItem } from '@/components/Grid'
import { CForm } from '@/components/Forms'
import { MentalHealthScheduleStatus } from '@/v3/domain/api/ApiMentalHealthSchedule'
import { CRadioButtonGroupControlled } from '@/v3/presentation/newComponents'

import { StyledButtonWrapper, StyledModalWrapper } from './styles'
interface FinalizeSessionModalProps {
  onSubmit: (body: { status: string }) => void
}
export const FinalizeSessionModal = ({ onSubmit }: FinalizeSessionModalProps) => {
  const { handleModal } = useModalContext()
  const { handleSubmit, control, formState, reset, ...others } = useForm({
    defaultValues: {
      status: '',
    },
  })
  return (
    <CForm form={{ handleSubmit, control, formState, reset, ...others }} onSubmit={onSubmit}>
      <StyledModalWrapper>
        <DialogTitle>Finalizar sessão</DialogTitle>
        <GridItem>
          <CRadioButtonGroupControlled
            name='status'
            options={[
              {
                value: MentalHealthScheduleStatus.Realizada,
                label: 'Sessão foi realizada com sucesso',
              },
              {
                value: MentalHealthScheduleStatus.NaoRealizada,
                label: 'Sessão não será realizada',
              },
            ]}
          />
        </GridItem>
        <StyledButtonWrapper>
          <Button type='submit'>Sim</Button>
          <Button variant='outlined' onClick={() => handleModal()}>
            Não
          </Button>
        </StyledButtonWrapper>
      </StyledModalWrapper>
    </CForm>
  )
}
