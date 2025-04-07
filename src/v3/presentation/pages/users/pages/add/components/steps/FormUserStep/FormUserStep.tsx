import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'

import { CForm } from '@/components/Forms'
import { CBaseContainer } from '@/v3/presentation/components/CBaseContainer'
import { useCWizardUrlControlContext } from '@/v3/presentation/hooks/useCWizardUrlControl'
import { CContainerContent } from '@/v3/presentation/newComponents'

import { BaseUserAddStepProps, IUserFormData } from '../../../types'
import { FormUser } from '../../../../../components/FormUser'

import { IFormUserDataFields, schemaUser, schemaUserWithRegister } from './schema'

export type FormUserStepProps = BaseUserAddStepProps & {
  onCreateUser: (body: IUserFormData) => Promise<void>
  isLoading?: boolean
  title: string
  withRegister?: boolean
}

export const FormUserStep = ({
  onCreateUser,
  title,
  withRegister,
  isLoading,
}: FormUserStepProps) => {
  const { previousStep } = useCWizardUrlControlContext()

  const form = useForm({
    resolver: yupResolver(withRegister ? schemaUserWithRegister : schemaUser),
  })

  const handleSubmit: SubmitHandler<IFormUserDataFields> = async (body) => {
    onCreateUser(body)
  }

  const handleGoBack = () => {
    previousStep?.()
  }

  return (
    <CForm id='myForm' form={form} onSubmit={handleSubmit}>
      <CBaseContainer
        boxShadow='none'
        buttonLabel='Finalizar'
        cancelLabel='Voltar'
        onCancel={handleGoBack}
        isLoading={isLoading}
        buttonDisabled={!form.formState.isDirty}
      >
        <CContainerContent title={title} withDivider>
          <FormUser withRegister={withRegister} />
        </CContainerContent>
      </CBaseContainer>
    </CForm>
  )
}
