import { Step } from 'react-joyride'

import { target } from '../target'
import { locale } from '../locale'

export const DashboardSteps: Step[] = [
  {
    target: `#${target.coalaSchoolHealth}`,
    title: 'Saúde escolar (1/13)',
    content: 'Aqui daremos algumas dicas sobre a saúde da sua instituição!',
    locale,
    disableBeacon: true,
    placement: 'center',
  },
  {
    target: `#${target.coalaAppointmentRequested}`,
    locale,
    title: 'Atendimentos solicitados (2/13)',
    placement: 'right',
    content: 'Veja a quantidade de atendimentos solicitados  até o momento.',
  },
  {
    target: `#${target.coalaAppointmentResolved}`,
    locale,
    title: 'Atendimentos resolvidos por teleatendimento (3/13)',
    placement: 'right',
    content: 'Exibimos aqui o percentual de atendimentos  resolvidos por teleatendimento.',
  },
  {
    target: `#${target.coalaHealthCases}`,
    locale,
    title: 'Tipos de casos de saúde (4/13)',
    placement: 'right',
    content:
      'Aqui você consegue saber quais são os  principais casos de saúde que acontecem na sua instituição.',
  },
  {
    target: `#${target.coalaFinishedStatus}`,
    locale,
    title: 'Desfecho dos atendimentos (5/13)',
    placement: 'right',
    content:
      'Saiba quais são os desfechos dos atendimentos da sua escola e a quantidade de cada um deles.',
  },
  {
    target: `#${target.coalaPatientWithMoreAppointment}`,
    locale,
    title: 'Pacientes com mais atendimentos (6/13)',
    placement: 'right',
    content: 'Aqui mostramos os três primeiros pacientes que mais solicitam atendimento.',
  },
  {
    target: `#${target.coalaAwaitingTime}`,
    locale,
    title: 'Tempo de espera para um atendimento (7/13)',
    placement: 'right',
    content: 'Mostramos aqui o tempo médio que um colaborador aguarda até ser atendido.',
  },
  {
    target: `#${target.coalaDurationTime}`,
    locale,
    title: 'Tempo de duração do atendimento (8/13)',
    placement: 'right',
    content: 'Já aqui trazemos a duração média dos atendimentos.',
  },
  {
    target: `#${target.coalaAppointmentCount}`,
    locale,
    title: 'Quantidade de atendimentos (9/13)',
    placement: 'right',
    content: 'Nesse gráfico você consegue ver a quantidade de atendimentos nos últimos 6 meses.',
  },
  {
    target: `#${target.coalaActivatedUsers}`,
    locale,
    title: 'Quantos usuários ativaram a conta? (10/13)',
    placement: 'right',
    content:
      'E pra você ficar por dentro das ativações, temos aqui a quantidade de usuários da sua instituição que ativaram a conta.',
  },
  {
    target: `#${target.coalaHealthUnitFilled}`,
    locale,
    title: 'Preenchimento de ficha de saúde (11/13)',
    placement: 'right',
    content: 'Número de usuários que preencheram pelo menos um dado da ficha de saúde.',
  },
  {
    target: `#${target.coalaRequestedPerHour}`,
    locale,
    title: 'Horários de maior fluxo de solicitações (12/13)',
    placement: 'right',
    content:
      'Nesse gráfico você acompanha o horário que tem maior número de solicitações de atendimento na sua instituição.',
  },
  {
    target: `#${target.coalaCourseUser}`,
    locale,
    title: 'Lei Lucas (13/13)',
    placement: 'right',
    content:
      'Para verificar o progresso do curso da Lei Lucas entre seus colaboradores, clique na seta no canto direito deste card. Isso abrirá uma tela exibindo todos os colaboradores e o status do curso de cada um.',
  },
]
