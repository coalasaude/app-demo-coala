/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
import { useFormContext } from 'react-hook-form'

import { CAccordion, CAccordionList } from '@/v3/presentation/newComponents'

import { useFieldArrayForm } from '../../pages/first-access/hooks/useFieldArrayForm'
import { DeleteIconButton } from '../DeleteIconButton'

import { FormDosages } from './FormDosages'
import { StatusIconDosage } from './IconFormDosage'
import { IVaccineFormField } from './schema'

interface VaccineDosageProps {
  handleSubmitDosage?: any
  onRemove?: (index: number) => void
  existentVaccines?: Record<number, { dosesDate: Date[]; reinforcementDates: Date[] }>
  vaccineOptions: {
    value: number
    label: string
  }[]
}

export const FormVacineDosage = ({
  existentVaccines,
  vaccineOptions,
  onRemove,
}: VaccineDosageProps) => {
  const form = useFormContext()

  const { fields, getIsExpanded, handleChange, handleRemove, prefixName } = useFieldArrayForm({
    prefixName: 'vaccines',
    removeDescription: 'Tem certeza que deseja remover essa doença?',
    removeTitle: 'Remover Doença',
    form,
  })

  const handleRemoveField = (index: number) => {
    handleRemove(index)
    onRemove?.(index)
  }

  return (
    <CAccordionList
      numColumnsMobile={1}
      numColumnsDesktop={1}
      options={fields as unknown as (IVaccineFormField & { id: string })[]}
      renderItem={(vaccine, index) => {
        const prefix = `${prefixName}.${index}`
        const isExpanded = getIsExpanded(index)
        const title =
          vaccineOptions.find((option) => option.value == vaccine.vacineId)?.label ||
          `Vacina ${index}`

        return (
          <CAccordion
            title={title}
            expanded={isExpanded}
            onChange={handleChange(index)}
            icon={<StatusIconDosage prefix={prefix} />}
          >
            <FormDosages
              index={index}
              prefix={prefix + '.'}
              existentVaccine={existentVaccines?.[vaccine.vacineId]}
              {...(fields.length > 1 && {
                secondaryButton: <DeleteIconButton onDelete={() => handleRemoveField(index)} />,
              })}
            />
          </CAccordion>
        )
      }}
    />
  )
}
