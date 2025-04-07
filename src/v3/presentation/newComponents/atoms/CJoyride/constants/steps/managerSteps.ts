import type { Step } from 'react-joyride'

import { NEW_ROUTES } from '@/constants/routes'

import { target } from '../target'
import { locale } from '../locale'

export const ManagerSteps: Step[] = [
  {
    target: `#${target.coala}`,
    title: 'Precisa de ajuda? (1/6)',
    content:
      'É só clicar aqui e acionar nosso o time de carinho que em até 5 minutos um de nossos Docs irá te ajudar!',
    locale,
    placement: 'right',
    disableBeacon: true,
    data: {
      next: `${NEW_ROUTES.AUTHENTICATED.APPOINTMENT.ADD.path}?step=INITIAL-DATA`,
      openSidebar: false,
    },
  },
  {
    target: `#${target.coalaInitialStep}`,
    locale,
    title: 'Selecione a instituição (2/6)',
    placement: 'top',
    data: { previous: '/app/hello', openSidebar: false },
    content:
      'Aqui nesse campo você pode selecionar para qual instituição deseja solicitar ajuda! Mas pode ficar tranquilo, se não houverem outras, este campo já estará preenchido :)',
  },
  {
    target: `#${target.coalaInitialStepSecond}`,
    locale,
    title: 'Encontrando o paciente (3/6)',
    placement: 'right',
    data: {
      next: `${NEW_ROUTES.AUTHENTICATED.APPOINTMENT.ADD.path}?step=DESCRIPTION`,
      openSidebar: false,
    },
    content:
      'É muito fácil achar o paciente, você só precisa digitar o nome neste campo e depois selecionar na lista suspensa. Não encontrou o nome na lista? Sem problemas, basta marcar no campo não achei o paciente.',
  },
  {
    target: `#${target.coalaResumeInputForm}`,
    locale,
    title: 'Conta pra gente o que houve? (4/6)',
    placement: 'right',
    data: {
      previous: `${NEW_ROUTES.AUTHENTICATED.APPOINTMENT.ADD.path}?step=INITIAL-DATA`,
      openSidebar: false,
    },
    content: 'Aqui você pode escrever brevemente sobre o que está acontecendo com o paciente.',
  },
  {
    target: `#${target.coalaResumeInputFormSecond}`,
    locale,
    title: 'Você tem uma imagem para anexar as informações? (5/6)',
    placement: 'right',
    data: { openSidebar: false },
    content:
      'Se você tiver uma imagem para enriquecer os dados do atendimento, pode fazer o envio por aqui, clicando no campo selecionar arquivo',
  },
  {
    target: `#${target.coalaNotifyResponsible}`,
    locale,
    title: 'Deseja notificar os responsáveis da criança? (6/6)',
    placement: 'right',
    data: { next: '/app/hello', openSidebar: true },
    content: 'Aqui você tem a opção de notificar ou não os responsáveis da criança.',
  },
  {
    target: `#${target.coalaSideBarUser}`,
    locale,
    title: 'Usuários (1/4)',
    placement: 'top',
    data: {
      previous: `${NEW_ROUTES.AUTHENTICATED.APPOINTMENT.ADD.path}??step=DESCRIPTION`,
      next: NEW_ROUTES.AUTHENTICATED.USERS.ACCESS.path,
      openSidebar: false,
    },
    content:
      'Aqui você pode gerenciar os usuários de sua instituição, podendo adicionar novos usuários e fazer exclusões quando necessário.',
  },
  {
    target: `#${target.coalaUserAccessCard}`,
    locale,
    title: 'Usuários (2/4)',
    placement: 'bottom',
    data: {
      previous: NEW_ROUTES.AUTHENTICATED.USERS.ACCESS.path,
      next: NEW_ROUTES.AUTHENTICATED.USERS.LIST.path,
      openSidebar: false,
    },
    content:
      'Basta clicar na sua instituição para ter acesso a lista completa dos usuários cadastrados.',
  },
  {
    target: `#${target.coalaUserPage}`,
    locale,
    title: 'Usuários (3/4)',
    placement: 'left',
    data: {
      previous: NEW_ROUTES.AUTHENTICATED.USERS.LIST.path,
      openSidebar: false,
    },
    content:
      'Para adicionar um novo usuário em sua instituição é só clicar em adicionar usuário e seguir o passo a passo.',
  },
  {
    target: `#${target.coalaUserListTable}`,
    locale,
    title: 'Usuários (4/4)',
    placement: 'left',
    data: { next: 'app/hello', openSidebar: true, isNavBar: true },
    content:
      'Quando for necessário excluir um usuário da sua instituição, basta clicar no botão ao lado e seguir o passo a passo.',
  },
  {
    target: `#${target.coalaSideBarAppointment}`,
    locale,
    title: 'Atendimentos',
    placement: 'right',
    data: {
      previous: NEW_ROUTES.AUTHENTICATED.USERS.LIST.path,
      openSidebar: true,
      isNavBar: true,
    },
    content:
      'Aqui você pode ver os históricos de atendimentos e acompanhar tudo que acontece na sua instituição.',
  },
  {
    target: `#${target.coalaSideBarHealthUnit}`,
    locale,
    title: 'Ficha de saúde',
    placement: 'right',
    data: { openSidebar: true, timeout: 500 },
    content: 'Todas as informações de saúde dos seus alunos e colaboradores estão compiladas aqui.',
  },
  {
    target: `#${target.coalaSideBarCourse}`,
    locale,
    title: 'Área de ensino',
    placement: 'auto',
    data: { openSidebar: true },
    content: 'Aqui na nossa área de ensino você pode aprender com a gente sobre saúde e bem estar',
  },
  {
    target: `#${target.coalaMaterials}`,
    locale,
    title: 'Materiais',
    placement: 'right',
    content: 'Todos os materiais de apoio que você vai precisar estão aqui!',
    data: { openModal: true, isTheEnd: true },
  },
]
