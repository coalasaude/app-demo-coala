import { useRouter } from 'next/router'

import { phoneNormalizer } from '@/components/Forms'
import { CInput } from '@/v3/presentation/newComponents'
import { bindPathParams } from '@/utils/bindParams'
import { NEW_ROUTES } from '@/constants/routes'
import { useAuth } from '@/v3/presentation/hooks/useAuth'
import { useFetchReadUser } from '@/v3/presentation/hooks/api/@v2/users/users/useFetchReadUser'

import { BaseFormData, BaseWrapperFormData } from '../BaseFormData'

export const FormLoginData = () => {
  const { auth } = useAuth()
  const router = useRouter()
  const userId = Number(router.query.userId as string)
  const { user } = useFetchReadUser({ userId })
  const canManagePassword = userId === auth.userId

  const handleEditEmail = () => {
    router.push(
      bindPathParams(NEW_ROUTES.AUTHENTICATED.USERS.EDIT.CHANGE_EMAIL.path, {
        userId,
      }),
    )
  }

  const handleEditPhone = () => {
    router.push(
      bindPathParams(NEW_ROUTES.AUTHENTICATED.USERS.EDIT.CHANGE_TELEPHONE.path, {
        userId,
      }),
    )
  }

  const handleEditPassword = () => {
    if (!canManagePassword) return

    router.push(
      bindPathParams(NEW_ROUTES.AUTHENTICATED.USERS.EDIT.CHANGE_PASSWORD.path, {
        userId: userId,
      }),
    )
  }

  return (
    <BaseFormData>
      <BaseWrapperFormData onClick={handleEditEmail}>
        <CInput
          name='email'
          label='E-mail'
          fullWidth
          placeholder='Digite o email'
          disabled
          defaultValue={user?.email || '-'}
        />
      </BaseWrapperFormData>

      <BaseWrapperFormData onClick={handleEditPhone}>
        <CInput
          placeholder='Digite o telefone'
          name='phone'
          label='Telefone'
          fullWidth
          disabled
          defaultValue={phoneNormalizer(user?.telephone) || '-'}
        />
      </BaseWrapperFormData>

      <BaseWrapperFormData canAction={canManagePassword} onClick={handleEditPassword}>
        <CInput
          placeholder='Senha'
          name='password'
          label='Senha'
          disabled
          fullWidth
          defaultValue='******'
        />
      </BaseWrapperFormData>
    </BaseFormData>
  )
}
