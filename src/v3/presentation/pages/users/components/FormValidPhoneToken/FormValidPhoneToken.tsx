import { useRouter } from 'next/router'
import { Button } from '@mui/material'

import { CInputControlled } from '@/v3/presentation/newComponents'
import { CForm } from '@/components/Forms'
import { useMutateSendToken } from '@/v3/presentation/hooks/api/@v2/users/users/useMutateSendToken'
import { useParams } from '@/hooks/useParams'

import { BaseFormData, BaseWrapperFormData } from '../BaseFormData'
import { BaseTitleTokenForm } from '../BaseFormData/BaseTitleTokenForm'
import { IValidTokenFormFields } from '../FormValidEmailToken/schema'

import { useFormValidPhoneToken } from './hooks/useFormValidPhoneToken'

export const FormValidPhoneToken = () => {
  const router = useRouter()
  const userId = Number(router.query.userId as string)
  const { onValidTokenPhone, form } = useFormValidPhoneToken({ userId })
  const { mutateAsync: sendToken } = useMutateSendToken()
  const widthVariant = '28%'
  const { params } = useParams()

  const onSubmit = (body: IValidTokenFormFields) => {
    const token = body.token

    onValidTokenPhone({ token })
  }

  const resendToken = async () => {
    const phone = params?.changeFieldFormValue ?? ''
    if (!phone) return

    await sendToken({ access: phone, ignoreValidations: true })
  }

  return (
    <CForm form={form} onSubmit={onSubmit}>
      <BaseFormData>
        <BaseWrapperFormData withButton={false} widthVariant={widthVariant}>
          <BaseTitleTokenForm field={params?.changeFieldFormValue} type='phone'>
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
