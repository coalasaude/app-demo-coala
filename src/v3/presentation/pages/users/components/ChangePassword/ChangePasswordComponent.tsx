import { CBaseContainer } from '@/v3/presentation/components/CBaseContainer'
import { CContainerContent } from '@/v3/presentation/newComponents'
import { PageHeader } from '@/v3/presentation/newComponents'

import PasswordForm from './PasswordForm'
import { PasswordFormProps } from './type'

const ChangePasswordComponent = ({
  hasPassword,
  form,
  onSubmit,
  passwordScore,
  currentData,
}: PasswordFormProps) => {
  return (
    <>
      <PageHeader title={hasPassword ? 'Alterar Senha' : 'Criar Senha'} />
      <CBaseContainer
        infoTitle={
          !hasPassword
            ? 'A senha deve conter no mínimo 8 caracteres, uma letra maiúscula, uma letra minúscula, um número, um carácter especial.'
            : ''
        }
      >
        <CContainerContent>
          <PasswordForm
            hasPassword={hasPassword}
            form={form}
            onSubmit={onSubmit}
            passwordScore={passwordScore}
            currentData={currentData}
          />
        </CContainerContent>
      </CBaseContainer>
    </>
  )
}

export default ChangePasswordComponent
