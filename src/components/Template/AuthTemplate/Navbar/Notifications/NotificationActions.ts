import { AUTHENTICATED_ROUTES, NEW_ROUTES } from '@/constants/routes'
import { bindPathParams } from '@/utils/bindParams'

export const NOTIFICATION_ACTIONS: Record<string, (data: any, functions: any) => string> = {
  CHANGE_APPOINTMENT_STATUS: (data: any, functions: any) =>
    functions.push(
      bindPathParams(NEW_ROUTES.AUTHENTICATED.APPOINTMENT.VIEW.path, {
        ...data,
      })
    ),
  CHANGE_SCHEDULED_APPOINTMENT_STATUS: (data: any, functions: any) =>
    functions.push(
      bindPathParams(NEW_ROUTES.AUTHENTICATED.APPOINTMENT.SCHEDULED_APPOINTMENT.path, {
        ...data,
      })
    ),
  ADD_APPOINTMENT: (data: any, functions: any) =>
    functions.push(
      bindPathParams(NEW_ROUTES.AUTHENTICATED.APPOINTMENT.VIEW.path, {
        ...data,
      })
    ),
  ADD_SCHEDULED_APPOINTMENT: (data: any, functions: any) =>
    functions.push(
      bindPathParams(NEW_ROUTES.AUTHENTICATED.APPOINTMENT.SCHEDULED_APPOINTMENT.path, {
        ...data,
      })
    ),
  ADD_FEEDBACK: (data: any, functions: any) =>
    functions.push(`${AUTHENTICATED_ROUTES.SURVEY}/${data.id}`),
  ADD_ROLE: (_: any, functions: any) => functions.selectModule(),
  ADD_RESPONSABLE: (_: any, functions: any) => functions.selectModule(),
}
