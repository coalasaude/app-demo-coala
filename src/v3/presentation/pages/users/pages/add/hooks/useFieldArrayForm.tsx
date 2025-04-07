import { UseFormReturn, useFieldArray } from 'react-hook-form'

import { useModalContext } from '@/v3/presentation/components/Modal'

import { CDialogue } from '../../../../../newComponents/layout/CDialogue'

export type IUseFieldArrayForm = {
  prefixName: string
  removeTitle?: string
  removeDescription?: string
  initDefaultValues?: object
  form: UseFormReturn<any, any>
}

export const useFieldArrayForm = ({
  prefixName,
  form,
  removeTitle = 'Remover',
  removeDescription = 'Tem certeza que deseja remover esse item?',
  initDefaultValues = {},
}: IUseFieldArrayForm) => {
  const { handleModal } = useModalContext()

  const { fields, append, remove, insert } = useFieldArray({
    control: form.control,
    name: prefixName,
  })

  const handleRemove = (index: number) => {
    handleModal(
      <CDialogue
        confirmButtonLabel={'Remover'}
        onConfirm={async () => {
          remove(index)
        }}
        title={removeTitle}
        description={removeDescription}
      />,
    )
  }

  const handleAdd = () => {
    insert(1, initDefaultValues)
  }

  return {
    form,
    append,
    remove,
    fields,
    handleRemove,
    handleAdd,
    prefixName,
  }
}
