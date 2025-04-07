import { useCallback, useMemo } from 'react'
import Router from 'next/router'

import { useLazyFetch } from '@/v3/presentation/hooks/useFetch'
import { MentalHealthSchedule } from '@/v3/domain/MentalHealth'
import {
  MentalHealthScheduleStatus,
  TMentalHealthSchedule
} from '@/v3/domain/api/ApiMentalHealthSchedule'
import { RecordStatus, TMentalHealthRecord } from '@/v3/domain/api/ApiMentalHealthRecord'
import { Record } from '@/v3/domain/Record'
import { useLayout } from '@/hooks/useLayout'
import { NEW_ROUTES } from '@/constants/routes'
import { TApiUserResponse } from '@/v3/domain/api/ApiUserResponse'
import { User } from '@/v3/domain/User'
import { bindPathParams } from '@/utils/bindParams'

interface MentalHealthPayload {
  status: MentalHealthScheduleStatus
  toStudent: boolean
  start?: string
  collaboratorId?: number
  professionalId: number
  institutionId: number
  studentId: number
  responsibleIds?: number[]
}

export interface RecordUserPayload {
  id: number
  type: 'CHILDREN' | 'RESPONSIBLE' | 'COLLABORATOR'
}

export interface AddMentalHealthRecordPayload {
  status: RecordStatus
  description: string
  scheduleId: number
  users?: RecordUserPayload[]
  certification_password?: string
  appointment_id: number
}

export interface UploadMentalHealthRecordPayload {
  status?: RecordStatus
  description?: string
  id: number
}

interface UploadMentalHealthPayload {
  status: MentalHealthScheduleStatus
  id: string
}

export const useFetchMentalHealth = () => {
  const { showSnackBar } = useLayout()
  const [fetch, { data, ...rest }] = useLazyFetch<{
    count: number
    results: TMentalHealthSchedule[]
  }>()
  const [fetchOne, { data: dataOne, ...restOne }] = useLazyFetch<TMentalHealthSchedule>()
  const [fetchRecord, { data: recordData, ...restRecord }] = useLazyFetch<TMentalHealthRecord>()
  const [fetchSelfRecords, { data: selfData, ...selfRecord }] = useLazyFetch<{
    count: number
    results: TMentalHealthSchedule[]
  }>()
  const [fetchAvailableUsers, { data: availableUsersData, ...availableUsersRest }] =
    useLazyFetch<TApiUserResponse[]>()

  const apiRequest = useCallback(
    async (filters?: any) =>
      await fetch({
        path: 'mental-health/schedule',
        queryParams: {
          ...filters
        },
        method: 'GET'
      }),
    [fetch]
  )

  const getSelf = useCallback(
    async (filters?: any) =>
      await fetchSelfRecords({
        path: 'mental-health/self',
        queryParams: {
          ...filters
        },
        method: 'GET'
      }),
    [fetchSelfRecords]
  )

  const getAvailableUsers = useCallback(
    async (filters: {
      startFrom: string
      startTo: string
      institutionId: number
      search_name?: string
    }) =>
      await fetchAvailableUsers({
        path: 'mental-health/professional',
        queryParams: {
          ...filters
        },
        method: 'GET'
      }),
    [fetchAvailableUsers]
  )

  const addMentalHealthSession = useCallback(
    async (payload: MentalHealthPayload) =>
      await fetch({
        path: 'mental-health/schedule',
        method: 'POST',
        body: payload
      }).then(({ error }) => {
        if (!error) {
          showSnackBar({
            message: 'Sessão criada com sucesso',
            type: 'success'
          })
          Router.push(NEW_ROUTES.AUTHENTICATED.MENTAL_HEALTH.path)
          return
        }
        showSnackBar({
          message: error?.data?.message,
          type: 'error'
        })
      }),
    [fetch, showSnackBar]
  )

  const getMentalHealthSession = useCallback(
    async (id: number) =>
      await fetchOne({
        path: `mental-health/schedule/${id}`,
        method: 'GET'
      }),
    [fetchOne]
  )

  const getMentalHealthRecord = useCallback(
    async (id: number) =>
      await fetchRecord({
        path: `mental-health/schedule/record/${id}`,
        method: 'GET'
      }),
    [fetchRecord]
  )

  const addMentalHealthRecord = useCallback(
    async (payload: AddMentalHealthRecordPayload) =>
      await fetchRecord({
        path: 'mental-health/schedule/record',
        method: 'POST',
        body: payload
      }).then(({ error }) => {
        if (!error) {
          showSnackBar({
            message: 'Registro criado com sucesso',
            type: 'success'
          })
          Router.push(
            bindPathParams(NEW_ROUTES.AUTHENTICATED.MENTAL_HEALTH.SESSION.path, {
              id: payload.scheduleId
            })
          )
          return
        }
        showSnackBar({
          message: error?.data?.message,
          type: 'error'
        })
      }),
    [fetchRecord, showSnackBar]
  )

  const updateMentalHealthRecord = useCallback(
    async (payload: UploadMentalHealthRecordPayload) =>
      await fetchRecord({
        path: `mental-health/schedule/record/${payload.id}`,
        method: 'PUT',
        body: {
          status: payload?.status,
          description: payload?.description
        }
      }).then(({ error }) => {
        if (!error) {
          showSnackBar({
            message: 'Registro atualizado com sucesso',
            type: 'success'
          })
          return
        }
        showSnackBar({
          message: error?.data?.message,
          type: 'error'
        })
      }),
    [fetchRecord, showSnackBar]
  )

  const updateMentalHealthSession = useCallback(
    async (payload: UploadMentalHealthPayload, successMessage?: string) =>
      await fetch({
        path: `mental-health/schedule/${payload.id}`,
        method: 'PUT',
        body: { status: payload.status }
      }).then(({ error }) => {
        if (!error) {
          showSnackBar({
            message: successMessage || 'Sessão atualizada com sucesso',
            type: 'success'
          })
          return
        }
        showSnackBar({
          message: error?.data?.message,
          type: 'error'
        })
      }),
    [fetch, showSnackBar]
  )

  const schedules = useMemo(
    () => data?.results?.map((schedule) => new MentalHealthSchedule(schedule)) || [],
    [data]
  )
  const selfSchedules = useMemo(
    () => selfData?.results?.map((schedule) => new MentalHealthSchedule(schedule)) || [],
    [selfData]
  )

  const schedule = useMemo(() => dataOne && new MentalHealthSchedule(dataOne), [dataOne])

  const record = useMemo(() => recordData && new Record(recordData), [recordData])

  const availableUsers = useMemo(
    () => availableUsersData?.map((user) => user && new User(user)) || [],
    [availableUsersData]
  )

  return {
    apiRequest,
    data: schedules,
    addMentalHealthSession,
    updateMentalHealthSession,
    getMentalHealthSession,
    getMentalHealthRecord,
    addMentalHealthRecord,
    updateMentalHealthRecord,
    getAvailableUsers,
    availableUsers,
    record,
    schedule,
    getSelf,
    selfData: {
      data: selfSchedules,
      ...selfRecord
    },
    schedules: {
      data,
      ...rest
    },
    ...restOne,
    ...rest,
    ...restRecord,
    ...availableUsersRest
  }
}
