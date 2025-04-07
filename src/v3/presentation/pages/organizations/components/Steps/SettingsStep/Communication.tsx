import CSwitchControlled from '@/v3/presentation/newComponents/implementations/form/CSwitchControlled'

import { Section } from '../../Section'

export const CommunicationSettings = () => {
  return (
    <Section title='Comunicação'>
      <CSwitchControlled
        name='settings.communication.openingOfServices'
        label='Notificar responsáveis da abertura de atendimentos'
      />
      <CSwitchControlled
        name='settings.communication.changesInService'
        label='Notificar responsáveis da alteração de status dos atendimentos'
      />
      <CSwitchControlled
        name='settings.communication.pendingFirstAccess'
        label='Habilitar notificações para usuários com primeiro acesso pendente'
      />
      <CSwitchControlled
        name='settings.communication.disableNotifications'
        label='Desabilitar demais notificações da plataforma'
      />
    </Section>
  )
}
