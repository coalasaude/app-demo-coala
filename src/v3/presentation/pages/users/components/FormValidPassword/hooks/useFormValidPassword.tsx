import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

import { useFetchReadUser } from '@/v3/presentation/hooks/api/@v2/users/users/useFetchReadUser'
import { bindPathParams } from '@/utils/bindParams'
import { NEW_ROUTES } from '@/constants/routes'
import { useParams } from '@/hooks/useParams'

import { schemaValidPassword, IValidPasswordFormFields } from '../schema'

type Props = { userId: number }

export const useFormValidPassword = ({ userId }: Props) => {
  const { user, isLoading } = useFetchReadUser({ userId })
  const { setParams } = useParams()
  const router = useRouter()
  const isPersonalData = router.asPath.includes('personal-data')
  const newRoute = isPersonalData
    ? NEW_ROUTES.AUTHENTICATED.USERS.EDIT.PERSONAL_DATA.path
    : NEW_ROUTES.AUTHENTICATED.USERS.EDIT.LOGIN_DATA.path

  const form = useForm({
    defaultValues: { password: '' },
    resolver: yupResolver(schemaValidPassword),
  })

  const sendPassword: SubmitHandler<IValidPasswordFormFields> = async (body) => {
    if (userId && body.password) {
      setParams({ userId, password: body.password })

      router.push(bindPathParams(newRoute, { userId }))
    }
  }

  return {
    sendPassword,
    isLoading,
    user,
    form,
  }
}
