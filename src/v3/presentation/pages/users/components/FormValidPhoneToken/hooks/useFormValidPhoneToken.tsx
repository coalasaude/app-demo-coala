import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

import { useFetchReadUser } from '@/v3/presentation/hooks/api/@v2/users/users/useFetchReadUser'
import { bindPathParams } from '@/utils/bindParams'
import { NEW_ROUTES } from '@/constants/routes'
import { useMutateValidToken } from '@/v3/presentation/hooks/api/@v2/users/users/useMutateValidToken'
import { useParams } from '@/hooks/useParams'
import { useMutateEditLoginUser } from '@/v3/presentation/hooks/api/@v2/users/users/useMutateEditLoginUser'

import { IValidTokenFormFields, schemaValidToken } from '../../FormValidEmailToken/schema'

export const useFormValidPhoneToken = ({ userId }: { userId: number }) => {
  const { user, isLoading } = useFetchReadUser({ userId })
  const { mutateAsync, isPending } = useMutateValidToken()
  const { mutateAsync: mutateEditUser } = useMutateEditLoginUser()
  const router = useRouter()
  const { params } = useParams()

  const form = useForm({
    defaultValues: { token: '' },
    resolver: yupResolver(schemaValidToken),
  })

  const onValidTokenPhone: SubmitHandler<IValidTokenFormFields> = async (body) => {
    if (userId && body.token) {
      const telephone = params.changeFieldFormValue

      await mutateAsync({
        code: body.token,
      }).then(() =>
        mutateEditUser({
          userId,
          telephone,
          code: body.token,
          password: params.password,
        }).then(() =>
          router.push(
            bindPathParams(NEW_ROUTES.AUTHENTICATED.USERS.VIEW.path, {
              userId,
            }),
          ),
        ),
      )
    }
  }

  return {
    onValidTokenPhone,
    isLoading,
    isPending,
    user,
    form,
  }
}
