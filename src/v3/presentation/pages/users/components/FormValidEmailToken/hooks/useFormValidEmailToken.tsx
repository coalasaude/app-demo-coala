import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

import { useFetchReadUser } from '@/v3/presentation/hooks/api/@v2/users/users/useFetchReadUser'
import { bindPathParams } from '@/utils/bindParams'
import { NEW_ROUTES } from '@/constants/routes'
import { useParams } from '@/hooks/useParams'
import { useMutateEditLoginUser } from '@/v3/presentation/hooks/api/@v2/users/users/useMutateEditLoginUser'

import { schemaValidToken, IValidTokenFormFields } from '../schema'

export const useFormValidEmailToken = ({ userId }: { userId: number }) => {
  const { user, isLoading } = useFetchReadUser({ userId })
  const { mutateAsync: mutateEditUser, isPending } = useMutateEditLoginUser()
  const router = useRouter()
  const { params } = useParams()

  const form = useForm({
    defaultValues: { token: '' },
    resolver: yupResolver(schemaValidToken),
  })

  const onValidTokenEmail: SubmitHandler<IValidTokenFormFields> = async (body) => {
    if (userId && body.token) {
      const email = params.changeFieldFormValue

      await mutateEditUser({
        userId,
        email,
        code: body.token,
        password: params.password,
      }).then(() =>
        router.push(
          bindPathParams(NEW_ROUTES.AUTHENTICATED.USERS.VIEW.path, {
            userId,
          }),
        ),
      )
    }
  }

  return {
    onValidTokenEmail,
    isLoading,
    isPending,
    user,
    form,
  }
}
