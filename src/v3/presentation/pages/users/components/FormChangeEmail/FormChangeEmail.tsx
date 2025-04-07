import { useRouter } from 'next/router'
import { Button } from '@mui/material'
import { useEffect } from 'react'
import { get } from 'lodash'

import { CInputControlled } from '@/v3/presentation/newComponents'
import { CForm } from '@/components/Forms'
import { useParams } from '@/hooks/useParams'
import { UserStatus } from '@/types/user'
import { useAuth } from '@/v3/presentation/hooks/useAuth'
import { bindPathParams } from '@/utils/bindParams'
import { NEW_ROUTES } from '@/constants/routes'

import { BaseFormData, BaseWrapperFormData } from '../BaseFormData'
import { BaseTitleChangeForm } from '../BaseFormData/BaseTitleChangeForm'

import { useFormChangeEmail } from './hooks/useFormChangeEmail'
import { IChangeEmailFormFields } from './schema'

export const FormChangeEmail = () => {
  const { user: loggedUser } = useAuth()
  const router = useRouter()
  const userId = Number(router.query.userId as string)
  const { user, onUpdateEmail, form, error } = useFormChangeEmail({ userId })
  const widthVariant = '28%'
  const { setParams } = useParams()

  const onSubmit = (body: IChangeEmailFormFields) => {
    const email = body.email
    const isRequired = user?.status !== UserStatus.FIRST_ACCESS || !user?.telephone
    const hasNoAccess = user?.status === UserStatus.NO_ACCESS

    if (!email && isRequired && !hasNoAccess) {
      form.setError('email', {
        message: 'Não é possível remover o e-mail sem ter um telefone cadastrado',
      })
      return
    }

    onUpdateEmail({ email })
  }

  useEffect(() => {
    setParams((params: any) => {
      return { ...params, changeFieldValue: user?.email }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (user && user.status !== UserStatus.FIRST_ACCESS) {
      const isPersonalData = router.asPath.includes('personal-data')
      const newRoute = isPersonalData
        ? NEW_ROUTES.AUTHENTICATED.USERS.EDIT.PERSONAL_DATA.path
        : NEW_ROUTES.AUTHENTICATED.USERS.EDIT.LOGIN_DATA.path

      if (userId !== loggedUser?.id && !loggedUser?.isAdmin) {
        router.push(bindPathParams(newRoute, { userId }))
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, loggedUser?.id])

  return (
    <CForm form={form} onSubmit={onSubmit}>
      <BaseFormData>
        <BaseWrapperFormData withButton={false} widthVariant={widthVariant}>
          <BaseTitleChangeForm field={user?.email} type='email'>
            <CInputControlled
              name='email'
              label='E-mail'
              fullWidth
              placeholder='Novo endereço de e-mail'
              helperText
              error={get(error, error)}
            />
          </BaseTitleChangeForm>
        </BaseWrapperFormData>
        <BaseWrapperFormData withButton={false} widthVariant={widthVariant}>
          <Button onClick={form.handleSubmit(onSubmit)} fullWidth>
            {user?.status === UserStatus.FIRST_ACCESS || user?.status === UserStatus.NO_ACCESS
              ? 'Salvar'
              : 'Continuar'}
          </Button>
        </BaseWrapperFormData>
      </BaseFormData>
    </CForm>
  )
}
