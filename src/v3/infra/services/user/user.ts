import { Dayjs } from 'dayjs'

import { TApiUserListResponse, TApiUserResponse } from '@/v3/domain/api/ApiUserResponse'
import { Genre } from '@/types/genre'
import { UserStatus } from '@/types/user'
import { IFormResponsibleDataFields } from '@/v3/presentation/pages/users/components/FormResponsible/schema'
import { TApiProfileResponse } from '@/v3/domain/api/ApiProfileResponse'
import { objectToFormData } from '@/utils/objectToFormData'
import { IFormProfiles } from '@/v3/presentation/pages/users/components/FormProfile'

import apiRequest from '../api'

export interface UpdateUserPayload {
  cpf?: string
  email?: string | null
  name?: string
  lastname?: string
  lastName?: string
  socialName?: string
  telephone?: string | null
  birthday?: Date | string | Dayjs
  genre?: Genre | null
  status?: UserStatus
  createdAt?: Date
  updatedAt?: Date
  address?: {
    street?: string
    neighborhood?: string
    complement?: string
    state?: string
    city?: string
    number?: string
    zip_code?: string
  }
}

export type AddUserPayload = {
  institutionId?: number
  roles: {
    id: number
  }[]
  users: {
    name: string
    lastname: string
    email: string
    telephone: string
    medicalRole?: {
      id: number
      data: string
    }
  }[]
}

interface CreateNewPassword {
  password?: string
  oldPassword?: string
}

interface HealthLeader {
  id: number
  userId: number
  institutionId?: number
}

interface AddUserProfile {
  userId: number
  institutionId?: number
  roles: IUserProfileRole[]
}

export interface UpdateUserProfile extends IUserProfileRole {
  profileId: number
  userId: number
}

export interface IUserProfileRole {
  id: number
  registration?: string
  enrollment?: string
  class?: string
  companyPositionId?: number
  educationalStageId?: number
  schoolGradeId?: number
}

export interface GetUsersFilters {
  limit?: number
  offset?: number
  direction?: 'asc' | 'desc'
  orderBy?: 'name' | 'status'

  name?: string
  profileId?: number
  status?: string
  email?: string
  phone?: string
  institutionId?: number
  brandId?: number
  networkId?: number
}

export type IAddResponsiblePayload = (Omit<
  IFormResponsibleDataFields,
  'responsibleId' | 'responsible'
> & { userExists: boolean })[]

export const getUsers = (filters: GetUsersFilters) => {
  return apiRequest<TApiUserListResponse>({
    method: 'GET',
    path: 'user',
    throwError: true,
    queryParams: {
      ...filters,
      profileId: filters.profileId,
      status: filters.status,
      search_name: filters.name,
      institutionId: filters.institutionId,
      search_email: filters.email,
      search_telephone: filters.phone,
    },
  })
}
export const putHealthLeader = (body: HealthLeader) =>
  apiRequest({
    method: 'PUT',
    path: 'profiles/health-leader',
    throwError: true,
    body,
  })

export const getUserById = (id: number) =>
  apiRequest<TApiUserResponse>({
    method: 'GET',
    path: `user/${id}`,
    useApiFilters: true,
    throwError: true,
  })

export const addUser = (payload: AddUserPayload) =>
  apiRequest<TApiUserResponse>({
    method: 'POST',
    throwError: true,
    path: `user`,
    headers: {
      'x-institution-id': payload.institutionId,
      'x-children-id': undefined,
      'x-self-access': undefined,
    },
    body: payload,
  })

export const updateUser = (payload: Partial<UpdateUserPayload> & { userId: number }) =>
  apiRequest<TApiUserResponse>({
    method: 'PUT',
    throwError: true,
    path: `user/${payload.userId}`,
    body: payload,
  })

export const addResponsibleUser = (payload: {
  dependent_id: string
  responsables: IAddResponsiblePayload
}) =>
  apiRequest<TApiUserResponse>({
    method: 'POST',
    throwError: true,
    path: `user/responsable/dependent/`,
    body: payload,
  })

export const checkUser = (payload: { access: string }) =>
  apiRequest<TApiUserResponse>({
    method: 'POST',
    throwError: true,
    path: `user/check/`,
    body: payload,
  })

export const deleteResponsibleFromDependent = ({
  dependentId,
  responsibleId,
}: {
  dependentId?: number
  responsibleId?: number
}) =>
  apiRequest<boolean>({
    method: 'DELETE',
    throwError: true,
    path: `user/${dependentId}/responsable/${responsibleId}`,
  })

export const postPassword = (body: CreateNewPassword) =>
  apiRequest<CreateNewPassword>({
    method: 'POST',
    path: 'auth/password',
    throwError: true,
    body,
  })

export const postProfile = (body: AddUserProfile) =>
  apiRequest<IFormProfiles>({
    method: 'POST',
    path: `user/${body.userId}/profile`,
    throwError: true,
    body,
  })

export const putProfile = ({ profileId, id, ...body }: UpdateUserProfile) => {
  return apiRequest<IFormProfiles>({
    method: 'PUT',
    path: `user/:userId/profile/:userProfileId`,
    throwError: true,
    useApiFilters: false,
    body: {
      ...body,
      id: profileId,
    },
    pathParams: {
      userId: body.userId,
      userProfileId: id,
    },
  })
}

export const getProfiles = (query: { institutionId?: number; institutionTypeId?: number }) => {
  return apiRequest<TApiProfileResponse[]>({
    path: 'user/profiles',
    method: 'GET',
    throwError: true,
    queryParams: {
      institution_id: query.institutionId,
      institution_type_id: query.institutionTypeId,
    },
  })
}

export const removeProfile = (id: number) =>
  apiRequest({
    method: 'DELETE',
    useApiFilters: false,
    path: 'user/remove-role/:id',
    throwError: true,
    pathParams: {
      id,
    },
  })

export const removePictureProfile = (id: number) =>
  apiRequest({
    method: 'DELETE',
    path: 'user/remove-image/?dependentId=:dependentId',
    throwError: true,
    pathParams: {
      dependentId: id,
    },
  })

export const addPictureProfile = (data: { file: any; dependent_id: number }) => {
  const formData = objectToFormData(data)
  return apiRequest({
    method: 'POST',
    path: 'user/add-image',
    throwError: true,
    body: formData,
    cType: 'multipart/form-data',
  })
}
