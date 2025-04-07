import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'

import { CForm } from '@/components/Forms'
import { spacing } from '@/utils/spacing'
import { CBaseContainer } from '@/v3/presentation/components/CBaseContainer'
import { CContainerContent } from '@/v3/presentation/newComponents'
import { useCWizardUrlControlContext } from '@/v3/presentation/hooks/useCWizardUrlControl'

import { useFieldArrayForm } from '../../../hooks/useFieldArrayForm'
import { BaseUserAddStepProps, IUserCreationDependenceState } from '../../../types'

import { FormResponsibleStepField } from './components/FormResponsibleStepField/FormResponsibleStepField'
import { IFormResponsibleFields, schemaManyResponsible } from './schema'

export type FormResponsibleStepProps = BaseUserAddStepProps

export const FormResponsibleStep = ({ onSetData }: FormResponsibleStepProps) => {
  const { nextStep, previousStep } = useCWizardUrlControlContext()

  const form = useForm({
    resolver: yupResolver(schemaManyResponsible),
    defaultValues: { responsible: [{ name: '', lastname: '', phone: '', email: '' }] },
  })

  const { fields, handleAdd, handleRemove, prefixName } = useFieldArrayForm({
    prefixName: 'responsible',
    removeDescription: 'Tem certeza que deseja remover essa responsável?',
    removeTitle: 'Remover Responsável',
    form,
  })

  const handleSubmit: SubmitHandler<IFormResponsibleFields> = async (body) => {
    const emails = new Set()
    const phones = new Set()

    let isError = false
    body.responsible.forEach((resp, index) => {
      const { email, phone } = resp
      if (emails.has(email)) {
        form.setError(`responsible.${index}.email`, {
          message: 'Não é possível adicionar responsáveis com o mesmo email',
        })
        isError = true
      }

      if (phones.has(phone)) {
        form.setError(`responsible.${index}.phone`, {
          message: 'Não é possível adicionar responsáveis com o mesmo telefone',
        })
        isError = true
      }

      emails.add(email)
      phones.add(phone)
    })

    if (isError) return

    onSetData?.({
      responsible: body.responsible.map((responsible) => ({
        name: responsible.name,
        lastname: responsible.lastname,
        email: responsible.email,
        phone: responsible.phone,
      })),
      dependents: body.responsible.reduce((acc, responsible) => {
        const children = responsible.responsible?.childrens?.map<IUserCreationDependenceState>(
          (child) => ({
            id: child.id!,
            name: child.name!,
            lastname: child.lastname!,
            status: child?.status,
            url: child?.userImage?.url,
          }),
        )
        if (children) {
          return [...acc, ...children]
        }
        return acc
      }, [] as IUserCreationDependenceState[]),
    })

    nextStep?.()
  }

  const onGoBack = () => {
    previousStep?.()
  }

  return (
    <CForm id='myForm' form={form} onSubmit={handleSubmit}>
      <CBaseContainer
        mt={spacing(2)}
        boxShadow='none'
        buttonLabel='Próximo'
        cancelLabel='Voltar'
        onCancel={onGoBack}
        buttonDisabled={!form.formState.isDirty}
      >
        <CContainerContent withDivider noBorder title='Comece pelos responsáveis'>
          {fields.map((field, index) => {
            const isAdd = index === 0
            return (
              <FormResponsibleStepField
                key={field.id}
                prefixName={`${prefixName}.${index}.`}
                handleAdd={isAdd ? handleAdd : undefined}
                handleRemove={isAdd ? undefined : () => handleRemove(index)}
                form={form}
              />
            )
          })}
        </CContainerContent>
      </CBaseContainer>
    </CForm>
  )
}
