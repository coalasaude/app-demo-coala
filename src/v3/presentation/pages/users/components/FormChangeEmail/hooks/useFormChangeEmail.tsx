import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

import { useFetchReadUser } from '@/v3/presentation/hooks/api/@v2/users/users/useFetchReadUser'
import { bindPathParams } from '@/utils/bindParams'
import { NEW_ROUTES } from '@/constants/routes'
import { UserStatus } from '@/types/user'
import { useMutateVerifyEditLoginUser } from '@/v3/presentation/hooks/api/@v2/users/users/useMutateVerifyEditLoginUser'
import { useMutateEditUser } from '@/v3/presentation/hooks/api/@v2/users/users/useMutateEditUser'
import { useAuth } from '@/v3/presentation/hooks/useAuth'
import { useParams } from '@/hooks/useParams'

import { IChangeEmailFormFields, schemaChangeEmail } from '../schema'

export const useFormChangeEmail = ({ userId }: { userId: number }) => {
  let error = ''
  const { user: loggedUser } = useAuth()
  const { user, isLoading } = useFetchReadUser({ userId })
  const router = useRouter()
  const { params, setParams } = useParams()
  const { mutateAsync: mutateEditUser } = useMutateEditUser()
  const { mutateAsync: mutateEditLoginUser } = useMutateVerifyEditLoginUser()

  const form = useForm<IChangeEmailFormFields>({
    defaultValues: {
      email: user?.email,
    },
    resolver: yupResolver(schemaChangeEmail),
  })

  const canAdminEdit = loggedUser?.isAdmin && userId !== loggedUser?.id

  const onUpdateEmail: SubmitHandler<IChangeEmailFormFields> = async (body) => {
    if (
      user?.status === UserStatus.FIRST_ACCESS ||
      user?.status === UserStatus.NO_ACCESS ||
      canAdminEdit
    ) {
      return await mutateEditUser({
        userId,
        email: body.email === '' ? null : body.email,
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

    if (userId && body.email) {
      setParams({ ...params, changeFieldFormValue: body.email })

      setTimeout(async () => {
        if (!body.email) return

        if (!params.password) {
          router.push(
            bindPathParams(NEW_ROUTES.AUTHENTICATED.USERS.EDIT.CHANGE_EMAIL.PASSWORD.path, {
              userId,
            }),
          )
        }

        await mutateEditLoginUser({
          userId,
          email: body.email === '' ? null : body.email,
          password: params.password,
        })
          .then(() =>
            router.push(
              bindPathParams(NEW_ROUTES.AUTHENTICATED.USERS.EDIT.CHANGE_EMAIL.TOKEN.path, {
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
    onUpdateEmail,
    isLoading,
    user,
    form,
    error,
  }
}
