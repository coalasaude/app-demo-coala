import { ReactElement } from 'react'
import Router from 'next/router'
import { VideocamOutlined } from '@mui/icons-material'

import { MentalHealthScheduleStatus } from '@/v3/domain/api/ApiMentalHealthSchedule'
import { NEW_ROUTES } from '@/constants/routes'
import { bindPathParams } from '@/utils/bindParams'

import ScheduleList from '../components/ScheduleList'
import { UserViewConfigKeys } from '../types/userViewConfigKeys'
import { CalendarViewType } from '../constants/calendarViewType'
import ScheduleCard from '../components/ScheduleCard'
import SmallScheduleCard from '../components/SmallScheduleCard'
import MySchedule from '../components/MySchedule'
import { MyScheduleProvider } from '../contexts/my-schedule.provider'

export interface SessionActions {
  primary?: {
    title: string
    action: (params: { id?: string; cb?: () => void }) => void
    icon?: () => ReactElement<any, any>
  }
  secondary?: {
    title: string
    action: (params: { id?: string; cb?: () => void }) => void
    icon?: () => ReactElement<any, any>
  }
}

export interface UserViewConfig {
  canCreate: boolean
  calendar: CalendarViewType
  labelSection: string
  filters: boolean
  session: {
    [key in MentalHealthScheduleStatus]?: SessionActions
  }
  tabs?: {
    label: string
    component: ReactElement<any, any>
    cardComponent?: (session: any) => ReactElement<any, any>
  }[]
  apiFilters?: Record<string, string | number | boolean | null>
}

export const userViewConfigDic: Record<UserViewConfigKeys, UserViewConfig> = {
  [UserViewConfigKeys.PSYCHO]: {
    canCreate: true,
    calendar: CalendarViewType.PER_DAY,
    labelSection: 'Minhas sessões',
    filters: true,
    session: {
      [MentalHealthScheduleStatus.Agendada]: {
        primary: {
          title: 'Confirmar Sessão',
          action: ({ cb }) => {
            cb?.()
          },
        },
        secondary: {
          title: 'Cancelar Sessão',
          action: ({ cb }) => {
            cb?.()
          },
        },
      },
      [MentalHealthScheduleStatus.Confirmada]: {
        primary: {
          title: 'Chamada de vídeo',
          action: ({ id }) => {
            Router.push(
              bindPathParams(NEW_ROUTES.AUTHENTICATED.APPOINTMENT.CALL.path, {
                id: String(id),
              })
            )
          },
          icon: () => <VideocamOutlined />,
        },
        secondary: {
          title: 'Finalizar Sessão',
          action: ({ cb }) => {
            cb?.()
          },
        },
      },
      [MentalHealthScheduleStatus.Realizada]: {},
      [MentalHealthScheduleStatus.Cancelada]: {},
    },
    tabs: [
      {
        label: 'Agenda',
        component: <ScheduleList />,
        cardComponent: (session) => <ScheduleCard session={session} />,
      },
      {
        label: 'Meus agendamentos',
        component: <ScheduleList isSelf />,
        cardComponent: (session) => <SmallScheduleCard session={session} />,
      },
      {
        label: 'Meus Horários',
        component: (
          <MyScheduleProvider>
            <MySchedule />
          </MyScheduleProvider>
        ),
      },
    ],
  },
  [UserViewConfigKeys.CAREGIVER]: {
    canCreate: true,
    calendar: CalendarViewType.PER_DAY,
    labelSection: 'Minhas sessões',
    filters: true,
    session: {
      [MentalHealthScheduleStatus.Agendada]: {
        primary: {
          title: 'Confirmar Sessão',
          action: ({ cb }) => {
            cb?.()
          },
        },
        secondary: {
          title: 'Cancelar Sessão',
          action: ({ cb }) => {
            cb?.()
          },
        },
      },
      [MentalHealthScheduleStatus.Confirmada]: {
        secondary: {
          title: 'Finalizar Sessão',
          action: ({ cb }) => {
            cb?.()
          },
        },
      },
      [MentalHealthScheduleStatus.Realizada]: {},
      [MentalHealthScheduleStatus.Cancelada]: {},
    },
    tabs: [
      {
        label: 'Agenda',
        component: <ScheduleList />,
        cardComponent: (session) => <ScheduleCard session={session} />,
      },
    ],
  },
  [UserViewConfigKeys.CHILD]: {
    canCreate: false,
    calendar: CalendarViewType.PER_MONTH,
    labelSection: 'Minhas sessões',
    filters: true,
    session: {
      [MentalHealthScheduleStatus.Agendada]: {},
      [MentalHealthScheduleStatus.Confirmada]: {
        primary: {
          title: 'Chamada de vídeo',
          action: ({ id }) => {
            Router.push(
              bindPathParams(NEW_ROUTES.AUTHENTICATED.APPOINTMENT.CALL.path, {
                id: String(id),
              })
            )
          },
          icon: () => <VideocamOutlined />,
        },
      },
      [MentalHealthScheduleStatus.Realizada]: {},
      [MentalHealthScheduleStatus.Cancelada]: {},
    },
    tabs: [
      {
        label: 'Agenda',
        component: <ScheduleList isSelf />,
        cardComponent: (session) => <SmallScheduleCard session={session} />,
      },
    ],
    apiFilters: {
      onlyMine: true,
    },
  },
  [UserViewConfigKeys.RESPONSIBLE]: {
    canCreate: false,
    calendar: CalendarViewType.PER_MONTH,
    labelSection: 'Minhas sessões',
    filters: true,
    session: {
      [MentalHealthScheduleStatus.Agendada]: {},
      [MentalHealthScheduleStatus.Confirmada]: {
        primary: {
          title: 'Chamada de vídeo',
          action: ({ id }) => {
            Router.push(
              bindPathParams(NEW_ROUTES.AUTHENTICATED.APPOINTMENT.CALL.path, {
                id: String(id),
              })
            )
          },
          icon: () => <VideocamOutlined />,
        },
      },
      [MentalHealthScheduleStatus.Realizada]: {},
      [MentalHealthScheduleStatus.Cancelada]: {},
    },
    tabs: [
      {
        label: 'Agenda',
        component: <ScheduleList isSelf />,
        cardComponent: (session) => <SmallScheduleCard session={session} />,
      },
    ],
    apiFilters: {
      allMyChildren: true,
    },
  },
  [UserViewConfigKeys.COLLABORATOR]: {
    canCreate: false,
    calendar: CalendarViewType.PER_MONTH,
    labelSection: 'Minhas sessões',
    filters: true,
    session: {
      [MentalHealthScheduleStatus.Agendada]: {},
      [MentalHealthScheduleStatus.Confirmada]: {
        primary: {
          title: 'Chamada de vídeo',
          action: ({ id }) => {
            Router.push(
              bindPathParams(NEW_ROUTES.AUTHENTICATED.APPOINTMENT.CALL.path, {
                id: String(id),
              })
            )
          },
          icon: () => <VideocamOutlined />,
        },
      },
      [MentalHealthScheduleStatus.Realizada]: {},
      [MentalHealthScheduleStatus.Cancelada]: {},
    },
    tabs: [
      {
        label: 'Agenda',
        component: <ScheduleList isSelf />,
        cardComponent: (session) => <SmallScheduleCard session={session} />,
      },
    ],
    apiFilters: {
      onlyMine: true,
    },
  },
  [UserViewConfigKeys.NO_PERMISSION]: {
    canCreate: false,
    calendar: CalendarViewType.PER_MONTH,
    labelSection: 'Minhas sessões',
    filters: true,
    session: {
      [MentalHealthScheduleStatus.Confirmada]: {
        primary: {
          title: 'Realizar Sessão',
          action: () => {
            return null
          },
        },
      },
    },
    tabs: [],
  },
}
