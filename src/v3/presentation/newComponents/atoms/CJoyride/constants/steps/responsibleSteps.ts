import { Step } from 'react-joyride'

import { NEW_ROUTES } from '@/constants/routes'

import { target } from '../target'
import { locale } from '../locale'

export const ResponsibleSteps: Step[] = [
  {
    target: `#${target.coalaSideBarAppointment}`,
    locale,
    title: 'Atendimentos (1/4)',
    placement: 'right',
    disableBeacon: true,
    data: { previous: NEW_ROUTES.AUTHENTICATED.USERS.LIST.path, openSidebar: false },
    content:
      'Aqui você pode ver os históricos de atendimentos e acompanhar tudo que acontece na sua instituição.',
  },
  {
    target: `#${target.coalaSideBarHealthUnit}`,
    locale,
    title: 'Ficha de saúde (2/4)',
    placement: 'right',
    data: { openSidebar: true },
    content: 'Todas as informações de saúde dos seus alunos e colaboradores estão compiladas aqui.',
  },
  {
    target: `#${target.coalaSideBarCourse}`,
    locale,
    title: 'Área de ensino (3/4)',
    placement: 'right',
    data: { openSidebar: true },
    content: 'Aqui na nossa área de ensino você pode aprender com a gente sobre saúde e bem estar',
  },
  {
    target: `#${target.coalaMaterials}`,
    locale,
    title: 'Materiais (4/4)',
    placement: 'right',
    content: 'Todos os materiais de apoio que você vai precisar estão aqui!',
    data: { openModal: true, isTheEnd: true },
  },
]
