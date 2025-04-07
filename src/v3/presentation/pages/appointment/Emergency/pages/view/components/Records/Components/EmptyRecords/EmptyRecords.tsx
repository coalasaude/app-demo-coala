import WithoutRecords from 'public/assets/svg/AppointmentsView/WithoutRecords.svg'
import UnauthorizedAccess from 'public/assets/svg/AppointmentsView/UnauthorizedAppointmentImage.svg'
import { CDisplayFeedback } from '@/v3/presentation/newComponents/layout/CDisplayFeedback'

interface EmptyListProps {
  hasPatient?: boolean
  isAuthorized?: boolean
}

export const EmptyRecords = ({ hasPatient = true, isAuthorized }: EmptyListProps) => {
  return (
    <CDisplayFeedback
      title={
        isAuthorized
          ? 'Não existem registros adicionados neste ticket'
          : 'Você não tem permissão para acessar os registros deste atendimento'
      }
      subtitle={
        !hasPatient
          ? 'Para realizar registros é preciso que o usuário seja cadastrado no sistema.'
          : ''
      }
      align='left'
    >
      {isAuthorized ? <WithoutRecords /> : <UnauthorizedAccess />}
    </CDisplayFeedback>
  )
}
