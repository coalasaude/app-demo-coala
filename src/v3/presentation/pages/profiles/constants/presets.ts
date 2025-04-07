import { Permissions } from '@/constants/permissions'

export type TPresets = 'basic' | 'health' | 'selectAll'

const SelecAll = new Set([...Object.values(Permissions)])

const Basic = new Set([
  Permissions.VIEW_APPOINTMENT,
  Permissions.ADD_APPOINTMENT,
  Permissions.VIEW_FACULTATIVE_USERS_APPOINTMENTS_RECORDS,
  Permissions.MANAGE_HEALTH_HISTORY,
  Permissions.MANAGE_OTHER_HEALTH_HISTORY,
  Permissions.ADD_RESPONSABLE,
  Permissions.VIEW_USERS,
  Permissions.UPDATE_USER,
])

const Health = new Set([
  Permissions.VIEW_FACULTATIVE_USERS_APPOINTMENTS_RECORDS,
  Permissions.VIEW_APPOINTMENT,
  Permissions.ADD_APPOINTMENT,
  Permissions.MANAGE_APPOINTMENT,
  Permissions.MANAGE_HEALTH_HISTORY,
  Permissions.MANAGE_OTHER_HEALTH_HISTORY,
  Permissions.VIEW_USERS,
  Permissions.UPDATE_USER,
  Permissions.ADD_USER,
  Permissions.ADD_RESPONSABLE,
  Permissions.MANAGE_HEALTH_UNIT,
  Permissions.VIEW_HEALTH_UNIT,
  Permissions.VIEW_ORGANIZATIONS,
])

export const Presets = {
  selectAll: SelecAll,
  basic: Basic,
  health: Health,
}
