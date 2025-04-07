import { MentalHealthSchedule } from '@/v3/domain/MentalHealth'

import { StyledDetailsSection } from './styles'

export const DetailsTab = ({ session }: { session: MentalHealthSchedule }) => {
  return (
    <StyledDetailsSection>
      <h1>Detalhes da sessão</h1>
      <p>Instituição</p>
      <span>{session.appointment?.institution?.fantasyName}</span>
      <p>Participantes</p>
      {session.toStudent && (
        <span>
          {session.appointment?.patient?.getFormattedName()} -{' '}
          <span className='subInfo'>Aluno</span>
        </span>
      )}
      {!!session.responsible?.length &&
        session.responsible?.map((responsable) => {
          if (!responsable.id) return null
          return (
            <span key={responsable.id}>
              {responsable.getFormattedName()} - <span className='subInfo'>Responsável</span>
            </span>
          )
        })}
      <span>
        {session.professional?.getFormattedName()} - <span className='subInfo'>Profissional</span>
      </span>
      {session.collaborator && (
        <span>
          {session.collaborator?.getFormattedName()} - <span className='subInfo'>Colaborador</span>
        </span>
      )}
      <p>Agendado por</p>
      <span>
        {session.appointment?.requestedUser?.getFormattedName() || 'Não informado'} -{' '}
        <span className='subInfo'>Colaborador</span>
      </span>
    </StyledDetailsSection>
  )
}
