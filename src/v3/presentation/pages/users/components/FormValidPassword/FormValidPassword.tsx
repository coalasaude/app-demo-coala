import { useRouter } from 'next/router'
import { Button } from '@mui/material'

import { CInputControlled } from '@/v3/presentation/newComponents'
import { CForm } from '@/components/Forms'

import { BaseFormData, BaseWrapperFormData } from '../BaseFormData'
import { BaseTitlePasswordForm } from '../BaseFormData/BaseTitlePasswordForm'

import { useFormValidPassword } from './hooks/useFormValidPassword'
import { IValidPasswordFormFields } from './schema'

export const FormValidPassword = () => {
  const router = useRouter()
  const userId = Number(router.query.userId as string)
  const { form, sendPassword } = useFormValidPassword({ userId })
  const widthVariant = '28%'

  const onSubmit = (body: IValidPasswordFormFields) => {
    const password = body.password

    sendPassword({ password })
  }

  return (
    <CForm form={form} onSubmit={onSubmit}>
      <BaseFormData>
        <BaseWrapperFormData withButton={false} widthVariant={widthVariant}>
          <BaseTitlePasswordForm>
            <CInputControlled
              name='password'
              inputType='password'
              label='Senha'
              fullWidth
              placeholder='Digite a senha'
            />
          </BaseTitlePasswordForm>
        </BaseWrapperFormData>
        <BaseWrapperFormData withButton={false} widthVariant={widthVariant}>
          <Button onClick={form.handleSubmit(onSubmit)} fullWidth>
            Enviar
          </Button>
        </BaseWrapperFormData>
      </BaseFormData>
    </CForm>
  )
}
