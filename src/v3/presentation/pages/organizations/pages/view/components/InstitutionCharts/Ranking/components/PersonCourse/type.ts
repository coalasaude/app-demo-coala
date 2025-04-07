import { CourseUsersOutput } from '@/v3/domain/organizations/Dashboard'

export type PersonCourseType = {
  id: number
  name: string
  profile: string
  status: PersonTypeStatus
}[]

export enum PersonTypeStatus {
  IN_PROGRESS = 'Em andamento',
  FINISHED = 'Finalizado',
  NOT_STARTED = 'Não começou',
}

export const getUserCourseStatus = (user: CourseUsersOutput): PersonTypeStatus => {
  if (user.hasCertificate) return PersonTypeStatus.FINISHED
  if (user.inCourse) return PersonTypeStatus.IN_PROGRESS

  return PersonTypeStatus.NOT_STARTED
}
