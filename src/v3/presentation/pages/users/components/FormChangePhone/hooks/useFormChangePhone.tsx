import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

import { useFetchReadUser } from '@/v3/presentation/hooks/api/@v2/users/users/useFetchReadUser'
import { bindPathParams } from '@/utils/bindParams'
import { NEW_ROUTES } from '@/constants/routes'
import { useParams } from '@/hooks/useParams'
import { UserStatus } from '@/types/user'
import { useMutateVerifyEditLoginUser } from '@/v3/presentation/hooks/api/@v2/users/users/useMutateVerifyEditLoginUser'
import { useMutateEditUser } from '@/v3/presentation/hooks/api/@v2/users/users/useMutateEditUser'
import { useAuth } from '@/v3/presentation/hooks/useAuth'

import { schemaChangePhone, IChangePhoneFormFields } from '../schema'

export const useFormChangePhone = ({ userId }: { userId: number }) => {
  let error = ''
  const { user: loggedUser } = useAuth()
  const { user, isLoading } = useFetchReadUser({ userId })
  const { mutateAsync: mutateEditUser } = useMutateEditUser()
  const { mutateAsync: mutateEditLoginUser } = useMutateVerifyEditLoginUser()
  const router = useRouter()
  const { setParams, params } = useParams()

  const form = useForm<IChangePhoneFormFields>({
    defaultValues: {
      phone: user?.telephone,
    },
    resolver: yupResolver(schemaChangePhone),
  })

  const canAdminEdit = loggedUser?.isAdmin && userId !== loggedUser?.id

  const onUpdatePhone: SubmitHandler<IChangePhoneFormFields> = async (body) => {
    if (
      user?.status === UserStatus.FIRST_ACCESS ||
      user?.status === UserStatus.NO_ACCESS ||
      canAdminEdit
    ) {
      return await mutateEditUser({
        userId,
        telephone: body.phone === '' ? null : body.phone,
      })
        .then(() =>
          router.push(
            bindPathParams(NEW_ROUTES.AUTHENTICATED.USERS.VIEW.path, {
              userId,
            }),
          ),
        )
        .catch((e) => {
          error = e
        })
    }

    if (userId && body.phone) {
      setParams({ ...params, changeFieldFormValue: body.phone })

      setTimeout(async () => {
        if (!body.phone) return

        if (!params.password) {
          router.push(
            bindPathParams(NEW_ROUTES.AUTHENTICATED.USERS.EDIT.CHANGE_TELEPHONE.PASSWORD.path, {
              userId,
            }),
          )
        }

        await mutateEditLoginUser({
          userId,
          telephone: body.phone === '' ? null : body.phone,
          password: params.password,
        })
          .then(() =>
            router.push(
              bindPathParams(NEW_ROUTES.AUTHENTICATED.USERS.EDIT.CHANGE_TELEPHONE.TOKEN.path, {
                userId,
              }),
            ),
          )
          .catch((e) => {
            error = e
          })
      }, 200)
    }
  }

  return {
    onUpdatePhone,
    error,
    isLoading,
    user,
    form,
  }
}
