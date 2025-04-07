import { useState } from 'react'
import { UseFormReturn, useFieldArray } from 'react-hook-form'

import { CDialogue, useModalContext } from '@/v3/presentation/components/Modal'

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
  const [expanded, setExpanded] = useState<number | false | null>(null)
  const { handleModal } = useModalContext()

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: prefixName,
  })

  const handleChange = (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }

  const handleRemove = (index: number) => {
    handleModal(
      <CDialogue
        confirmButtonLabel={'Remover'}
        onConfirm={async () => {
          setExpanded(false)
          remove(index)
        }}
        title={removeTitle}
        description={removeDescription}
      />,
    )
  }

  const handleAdd = () => {
    append(initDefaultValues)
    setExpanded(fields.length)
  }

  const getIsExpanded = (index: number) => {
    if ((form.formState.errors?.[prefixName] as any)?.[index]) return true
    return expanded === index || expanded == null
  }

  return {
    form,
    append,
    setExpanded,
    expanded,
    remove,
    fields,
    handleChange,
    handleRemove,
    handleAdd,
    getIsExpanded,
    prefixName,
  }
}
