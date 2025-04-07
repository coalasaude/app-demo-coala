import { Box, Typography, useMediaQuery } from '@mui/material'

import { CForm } from '@/components/Forms'
import { CButton, CInputControlled } from '@/v3/presentation/newComponents'

import { BaseFormData, BaseWrapperFormData } from '../BaseFormData'

import { PasswordFormProps } from './type'
import { passwordValidationCriteria } from './utils/passwordValidationCriteria'

export interface Props extends PasswordFormProps {
  hasPassword: boolean
}

export const PasswordForm = ({
  hasPassword,
  form,
  onSubmit,
  passwordScore,
  currentData,
}: Props) => {
  const { watch } = form
  const password = watch('password')
  const passwordCriteria = passwordValidationCriteria(password)
  const isSmall = useMediaQuery('md')
  const width = isSmall ? '100%' : '30%'

  return (
    <CForm form={form} onSubmit={onSubmit}>
      <BaseFormData mt={0}>
        <Box />
        <BaseWrapperFormData withButton={false} widthVariant={width}>
          <Typography variant='body1'>
            Para alterar sua senha da sua conta basta preencher os campos abaixo.
          </Typography>
        </BaseWrapperFormData>
        {hasPassword && (
          <BaseWrapperFormData withButton={false} widthVariant={width}>
            <CInputControlled
              name='oldPassword'
              autoFocus
              rules={{ required: true }}
              type='password'
              label='Senha atual'
              placeholder='Digite a senha atual'
            />
          </BaseWrapperFormData>
        )}
        <BaseWrapperFormData withButton={false} widthVariant={width}>
          <CInputControlled
            name='password'
            label='Nova senha'
            rules={{ required: true }}
            type='password'
            placeholder='Digite a nova senha'
          />
        </BaseWrapperFormData>
        {passwordScore > 0 && (
          <Box display='flex' flexDirection='column' width={width} my={-1} ml={1}>
            {passwordCriteria.map((criterion, index) => (
              <Typography key={index} variant='body2' color={criterion.isValid ? 'green' : 'red'}>
                {criterion.isValid ? '✔' : '✘'} {criterion.label}
              </Typography>
            ))}
          </Box>
        )}

        <BaseWrapperFormData withButton={false} widthVariant={width}>
          <CInputControlled
            name='passwordConfirm'
            label='Confirmação da nova senha'
            rules={{ required: true }}
            type='password'
            placeholder='Confirme a nova senha'
          />
        </BaseWrapperFormData>
        {passwordScore > 0 && (
          <Box width={width} display='flex' mt={-2} alignItems='center'>
            <Box
              height='6px'
              width='100%'
              display='flex'
              justifyContent='space-between'
              borderRadius='3px'
              bgcolor='#e0e0e0'
            >
              <Box
                width={`${passwordScore}%`}
                borderRadius={1}
                bgcolor={currentData.bgColor}
                height='100%'
                sx={{ transition: 'width 0.3s ease' }}
              />
            </Box>

            <Typography ml={6} variant='body2'>
              {currentData.text}
            </Typography>
          </Box>
        )}
        <BaseWrapperFormData withButton={false} widthVariant={width}>
          <CButton
            fullWidth
            onClick={form.handleSubmit(onSubmit)}
            disabled={!form.formState.isDirty}
          >
            Salvar alterações
          </CButton>
        </BaseWrapperFormData>
      </BaseFormData>
    </CForm>
  )
}

export default PasswordForm
