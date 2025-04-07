import { yupResolver } from '@hookform/resolvers/yup'
import { Typography } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'

import { CForm } from '@/components/Forms'
import { GridItem, GridWrapper } from '@/components/Grid'
import { CBaseContainer } from '@/v3/presentation/components/CBaseContainer'
import { CContainerContent } from '@/v3/presentation/newComponents'
import { useCWizardUrlControlContext } from '@/v3/presentation/hooks/useCWizardUrlControl'
import { IFormDependentDataFields } from '@/v3/presentation/pages/users/components/FormDependent/schema'
import { IFormResponsibleDataFields } from '@/v3/presentation/pages/users/components/FormResponsible/schema'
import { CheckBoxDependentCard } from '@/v3/presentation/pages/users/pages/add/components/steps/FormResponsibleDependentStep/components/CheckBoxDependentCard'
import { FormNewDependent } from '@/v3/presentation/pages/users/pages/add/components/steps/FormResponsibleDependentStep/components/FormNewDependent/FormNewDependent'

import { BaseUserAddStepProps, IUserCreationDependenceState, IUserFormData } from '../../../types'

import { IFormResponsibleWithDependents, schemaDependents } from './schema'

export type FormResponsibleDependentStepProps = BaseUserAddStepProps & {
  onCreateUser: (body: IUserFormData) => Promise<void>
  isLoading?: boolean
  responsables: IFormResponsibleDataFields[]
  dependents: IUserCreationDependenceState[]
}

export const FormResponsibleDependentStep = ({
  onCreateUser,
  isLoading,
  responsables,
  dependents,
}: FormResponsibleDependentStepProps) => {
  const { previousStep } = useCWizardUrlControlContext()

  const form = useForm<IFormResponsibleWithDependents>({
    resolver: yupResolver(schemaDependents as any),
  })

  const dependentsIds = form.watch('dependentsIds')

  const handleSubmit: SubmitHandler<IFormDependentDataFields> = async (body) => {
    onCreateUser({
      dependentsIds: dependentsIds,
      name: body.name,
      lastname: body.lastname,
    })
  }

  const handleGoBack = () => {
    previousStep?.()
  }

  const responsablesNames = responsables.map((responsable) => responsable.name)
  const popResponsableName = responsablesNames.length > 1 ? responsablesNames.pop() : null
  const responsablesNamesString =
    responsablesNames.join(', ') + (popResponsableName ? ` e ${popResponsableName}` : '')

  const onSelectChild = (id: number, checked: boolean) => {
    if (checked) {
      const newCheckedIds = [...(dependentsIds || []), id]
      form.setValue('dependentsIds', newCheckedIds)
    } else {
      const newCheckedIds = dependentsIds?.filter((_id) => _id !== id)
      form.setValue('dependentsIds', newCheckedIds)
    }
  }
  return (
    <CForm id='myForm' form={form} onSubmit={handleSubmit}>
      <CBaseContainer
        boxShadow='none'
        buttonLabel='Finalizar'
        cancelLabel='Voltar'
        onCancel={handleGoBack}
        isLoading={isLoading}
        buttonDisabled={!form.formState.isDirty && !dependentsIds?.length}
      >
        <CContainerContent title='Dependentes encontrados' withDivider noBorder whiteSpace='normal'>
          <Typography variant='body1'>
            Olá! Parece que identificamos dependentes associados a <b>{responsablesNamesString}</b>,
            no sistema. Para incluir esses dependentes em sua instituição, basta selecioná-los nos
            cards abaixo.
          </Typography>
          <GridWrapper my={2}>
            {dependents.map((dependent) => {
              return (
                <GridItem xs={12} md={4} key={dependent.id}>
                  <CheckBoxDependentCard
                    name={dependent.name}
                    lastName={dependent.lastname}
                    imageUrl={dependent.url}
                    status={dependent.status}
                    setChecked={(checked) => onSelectChild(dependent.id, checked)}
                    checked={!!dependentsIds?.includes(dependent.id)}
                  />
                </GridItem>
              )
            })}
          </GridWrapper>
          <FormNewDependent />
        </CContainerContent>
      </CBaseContainer>
    </CForm>
  )
}
