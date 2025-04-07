import { useRouter } from 'next/router'
import { Button } from '@mui/material'

import { CInputControlled } from '@/v3/presentation/newComponents'
import { CForm } from '@/components/Forms'
import { useMutateSendToken } from '@/v3/presentation/hooks/api/@v2/users/users/useMutateSendToken'
import { useParams } from '@/hooks/useParams'

import { BaseFormData, BaseWrapperFormData } from '../BaseFormData'
import { BaseTitleTokenForm } from '../BaseFormData/BaseTitleTokenForm'

import { useFormValidEmailToken } from './hooks/useFormValidEmailToken'
import { IValidTokenFormFields } from './schema'

export const FormValidEmailToken = () => {
  const router = useRouter()
  const userId = Number(router.query.userId as string)
  const { onValidTokenEmail, form } = useFormValidEmailToken({ userId })
  const { mutateAsync: sendToken } = useMutateSendToken()
  const widthVariant = '28%'
  const { params } = useParams()

  const onSubmit = (body: IValidTokenFormFields) => {
    const token = body.token

    onValidTokenEmail({ token })
  }

  const resendToken = async () => {
    const email = params?.changeFieldFormValue ?? ''
    if (!email) return

    await sendToken({ access: email, ignoreValidations: true })
  }

  return (
    <CForm form={form} onSubmit={onSubmit}>
      <BaseFormData>
        <BaseWrapperFormData withButton={false} widthVariant={widthVariant}>
          <BaseTitleTokenForm field={params?.changeFieldFormValue} type='email'>
            <CInputControlled name='token' label='Código' fullWidth placeholder='Digite o código' />
          </BaseTitleTokenForm>
        </BaseWrapperFormData>
        <BaseWrapperFormData withButton={false} widthVariant={widthVariant}>
          <Button onClick={form.handleSubmit(onSubmit)} fullWidth>
            Continuar
          </Button>
        </BaseWrapperFormData>
        <BaseWrapperFormData withButton={false} widthVariant={widthVariant}>
          <Button variant='text' onClick={resendToken} fullWidth sx={{ my: -1 }}>
            Reenviar código
          </Button>
        </BaseWrapperFormData>
      </BaseFormData>
    </CForm>
  )
}
