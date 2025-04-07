import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { passwordStrength } from '@/utils/passwordStrength'
import { passwordScoreData } from '@/constants/passwordScore'
import ChangePasswordComponent from '@/v3/presentation/pages/users/components/ChangePassword/ChangePasswordComponent'
import {
  schemaChangePassword,
  initialValuesChangePassword,
  ChangePasswordFormData,
} from '@/v3/presentation/pages/users/components/ChangePassword/schema'
import { NEW_ROUTES } from '@/constants/routes'
import { bindPathParams } from '@/utils/bindParams'
import { useLayout } from '@/hooks/useLayout'
import { useMutateChangePassword } from '@/v3/presentation/hooks/api/@v2/auth/useMutateChangePassword'
import { useAuth } from '@/v3/presentation/hooks/useAuth'

const ChangePassword = () => {
  const { auth } = useAuth()
  const hasPassword = !!auth?.user?.hasPassword
  const form = useForm({
    defaultValues: initialValuesChangePassword,
    resolver: yupResolver(schemaChangePassword),
  })
  const router = useRouter()
  const { mutateAsync: addPassword } = useMutateChangePassword()
  const { showSnackBar } = useLayout()
  const password = form.watch('password')
  const passwordScore = passwordStrength(password)
  const currentData = passwordScoreData[passwordScore]
  const userId = String(router.query.id || router.query.userId)

  const onSubmit = async (values: ChangePasswordFormData) => {
    if (values?.password === values?.oldPassword) {
      return showSnackBar({
        type: 'error',
        message: 'A Senha não deve ser a mesma já cadastrada.',
      })
    }

    const data = await addPassword({
      password: values?.password,
      oldPassword: values?.oldPassword,
    })

    if (data) {
      router.push(
        bindPathParams(NEW_ROUTES.AUTHENTICATED.USERS.VIEW.bindPath, {
          userId,
        }),
      )
    }
  }

  useEffect(() => {
    form.setValue('hasPassword', hasPassword)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasPassword])

  return (
    <ChangePasswordComponent
      hasPassword={hasPassword}
      form={form}
      onSubmit={onSubmit}
      passwordScore={passwordScore}
      currentData={currentData}
    />
  )
}

export default ChangePassword
