import { ProfileType } from '@/types/profile'
import { InstitutionalType } from '@/types/institution'

import apiRequest from '../api'

export type TApiProfile = {
  id: number
  name: string
  type: ProfileType
  InstitutionalType?: { id: number; name: string }
  registration_description?: string
  institution_type_id?: number
  ProfilePermission?: [{ id: number; permission_id: number; profile_id: number }]
}

export type TApiProfileResponse = {
  count: number
  results: TApiProfile[]
}

export type TApiProfilePermission = {
  description: string
  id: number
  name: string
}

export type TApiListProfilePermission = TApiProfilePermission & {
  permissions: TApiProfilePermission[]
}

type IdPermissionsMapPayload = Record<number, boolean>

export type createProfilePayload = {
  institutionTypeId: number | null
  name: string
  permissions: IdPermissionsMapPayload
  type: ProfileType
}

export const getProfiles = () => {
  return apiRequest<TApiProfileResponse[]>({
    path: 'profiles',
    method: 'GET',
    throwError: true,
  })
}

export const getProfileById = (id: number) => {
  return apiRequest<TApiProfile>({
    path: 'profiles/:id',
    method: 'GET',
    pathParams: {
      id,
    },
    throwError: true,
  })
}

export const getProfilesTypes = () => {
  return apiRequest<InstitutionalType[]>({
    path: 'profiles/types',
    method: 'GET',
    throwError: true,
  })
}

export const getProfilesPermissions = () => {
  return apiRequest<TApiListProfilePermission[]>({
    path: 'profiles/permissions',
    method: 'GET',
    throwError: true,
  })
}

export const postProfiles = (body: createProfilePayload) => {
  return apiRequest<TApiProfile>({
    path: 'profiles',
    method: 'POST',
    body,
    throwError: true,
  })
}

export const updateProfiles = (body: createProfilePayload & { id: number }) => {
  return apiRequest<TApiProfile>({
    path: 'profiles/:id',
    method: 'PUT',
    pathParams: {
      id: body.id,
    },
    body,
    throwError: true,
  })
}

export const removeProfile = (id: number) => {
  return apiRequest<TApiProfile>({
    path: 'profiles/:id',
    method: 'DELETE',
    pathParams: {
      id,
    },
    throwError: true,
  })
}
