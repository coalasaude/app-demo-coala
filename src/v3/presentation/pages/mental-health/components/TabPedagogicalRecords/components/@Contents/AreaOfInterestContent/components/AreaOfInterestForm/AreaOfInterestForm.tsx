import { Stack } from '@mui/material'
import { useWatch } from 'react-hook-form'

import { InterestAreaCategory } from '@/v3/domain/@v2/mental-health/enums/pedagogical-area-type.enum'
import { CButtonGroupControlled } from '@/v3/presentation/newComponents/implementations/form/CButtonGroupControlled/CButtonGroupControlled'

import { AcademicForm } from './components/AcademicForm/AcademicForm'
import { ExtracurricularForm } from './components/ExtracurricularForm/ExtracurricularForm'
import { OthersForm } from './components/OthersForm/OthersForm'

type Props = {
  onAdd?: () => void
  onDelete?: () => void
  prefix?: string
  isEdit?: boolean
}

const FormMap = {
  [InterestAreaCategory.ACADEMIC]: AcademicForm,
  [InterestAreaCategory.EXTRACURRICULAR]: ExtracurricularForm,
  [InterestAreaCategory.OTHERS]: OthersForm,
}

export const AreaOfInterestForm = ({ prefix, onAdd, onDelete, isEdit }: Props) => {
  const categoryName = prefix ? `${prefix}category` : 'category'
  const category = useWatch({ name: categoryName }) as InterestAreaCategory
  const FormComponent = FormMap[category || InterestAreaCategory.ACADEMIC]

  return (
    <Stack spacing={2} maxWidth={650}>
      <CButtonGroupControlled
        name={categoryName}
        disabled={isEdit}
        options={[
          { label: 'Acadêmico', value: InterestAreaCategory.ACADEMIC },
          { label: 'Extracurricular', value: InterestAreaCategory.EXTRACURRICULAR },
          { label: 'Outros', value: InterestAreaCategory.OTHERS },
        ]}
      />

      <FormComponent prefix={prefix} onDelete={onDelete} onAdd={onAdd} />
    </Stack>
  )
}
