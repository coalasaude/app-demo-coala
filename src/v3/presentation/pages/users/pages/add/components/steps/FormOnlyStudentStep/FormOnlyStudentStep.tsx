import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'

import { CForm } from '@/components/Forms'
import { CBaseContainer } from '@/v3/presentation/components/CBaseContainer'
import { useCWizardUrlControlContext } from '@/v3/presentation/hooks/useCWizardUrlControl'
import { IFormDependentDataFields } from '@/v3/presentation/pages/users/components/FormDependent/schema'
import { CContainerContent } from '@/v3/presentation/newComponents'

import { BaseUserAddStepProps, IUserFormData } from '../../../types'
import { FormDependentData } from '../../FormDependentData'

import { schemaNewDependents } from './schema'

export type FormOnlyStudentStepProps = BaseUserAddStepProps & {
  onCreateUser: (body: IUserFormData) => Promise<void>
  isLoading?: boolean
}

export const FormOnlyStudentStep = ({ onCreateUser, isLoading }: FormOnlyStudentStepProps) => {
  const { previousStep } = useCWizardUrlControlContext()

  const form = useForm({
    resolver: yupResolver(schemaNewDependents),
  })

  const handleSubmit: SubmitHandler<IFormDependentDataFields> = async (body) => {
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
        <CContainerContent title='Aluno' withDivider>
          <FormDependentData />
        </CContainerContent>
      </CBaseContainer>
    </CForm>
  )
}
