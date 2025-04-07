import { useRouter } from 'next/router'
import { Button } from '@mui/material'
import { useEffect } from 'react'
import { get } from 'lodash'

import { CInputControlled } from '@/v3/presentation/newComponents'
import { CForm, phoneNormalizer } from '@/components/Forms'
import { useParams } from '@/hooks/useParams'
import { UserStatus } from '@/types/user'
import { NEW_ROUTES } from '@/constants/routes'
import { useAuth } from '@/v3/presentation/hooks/useAuth'
import { bindPathParams } from '@/utils/bindParams'

import { BaseFormData, BaseWrapperFormData } from '../BaseFormData'
import { BaseTitleChangeForm } from '../BaseFormData/BaseTitleChangeForm'

import { useFormChangePhone } from './hooks/useFormChangePhone'
import { IChangePhoneFormFields } from './schema'

export const FormChangePhone = () => {
  const router = useRouter()
  const { user: loggedUser } = useAuth()
  const userId = Number(router.query.userId as string)
  const { user, onUpdatePhone, form, error } = useFormChangePhone({ userId })
  const widthVariant = '28%'
  const { setParams } = useParams()

  const onSubmit = (body: IChangePhoneFormFields) => {
    const phone = body.phone
    const isRequired = user?.status !== UserStatus.FIRST_ACCESS || !user?.email
    const hasNoAccess = user?.status === UserStatus.NO_ACCESS

    if (!phone && isRequired && !hasNoAccess) {
      form.setError('phone', {
        message: 'Não é possível remover o telefone sem ter um e-mail cadastrado',
      })
      return
    }

    onUpdatePhone({ phone })
  }

  useEffect(() => {
    setParams((params: any) => {
      return { ...params, changeFieldValue: user?.telephone }
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
          <BaseTitleChangeForm field={phoneNormalizer(user?.telephone)} type='phone'>
            <CInputControlled
              name='phone'
              label='Telefone'
              fullWidth
              placeholder='Novo número de telefone'
              transform={{
                output: phoneNormalizer,
                input: phoneNormalizer,
              }}
              error={get(error, 'Este número de telefone já está sendo usado.')}
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
