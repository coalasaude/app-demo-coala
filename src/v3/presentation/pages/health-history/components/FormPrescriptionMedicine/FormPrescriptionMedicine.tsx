import { Box, Button, Typography } from '@mui/material'
import { useState } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import dayjs from 'dayjs'

import { GridItem, GridWrapper } from '@/components/Grid'
import { spacing } from '@/utils/spacing'
import { useModalContext } from '@/v3/presentation/components/Modal'
import { CAccordion, CAccordionBody, CAccordionList } from '@/v3/presentation/newComponents'
import { CFileInputAsyncControlled } from '@/v3/presentation/newComponents/implementations/form/CFileInputAsyncControlled'
import { CDatePickerControlled } from '@/components/Forms'

import { CDialogue } from '../../../../newComponents/layout/CDialogue'
import { DeleteIconButton } from '../DeleteIconButton'
import { FormMedicine } from '../FormMedicine'

import { IMedicinePrescriptionFormProps } from './types'

export function FormPrescriptionMedicine({
  concentrationUnitOptions,
  dosageUnitOptions,
  scheduledMedicineOptions,
  handleAsyncUploadMedicine,
  handleAsyncUploadPrescription,
}: IMedicinePrescriptionFormProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext()
  const { handleModal } = useModalContext()
  const [expanded, setExpanded] = useState<number | false | null>(null)

  const prefixMedicine = 'medicines'
  const { fields, append, remove } = useFieldArray({
    control,
    name: prefixMedicine,
  })

  const handleChange = (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }

  const handleAddMedicine = () => {
    append({ startHour: null, startDate: null })
    setExpanded(fields.length)
  }

  const handleRemoveMedicine = (index: number) => {
    handleModal(
      <CDialogue
        confirmButtonLabel='Remover'
        onConfirm={async () => {
          setExpanded(false)
          remove(index)
        }}
        title='Remover Medicamento'
        description='Tem certeza que deseja remover esse medicamento?'
      />,
    )
  }

  const getIsExpanded = (index: number) => {
    if ((errors as any)?.medicines?.[index]) return true
    return expanded === index || expanded == null
  }

  return (
    <Box>
      <Typography variant='body1' mb={spacing(2)}>
        Adicione aqui a receita médica:
      </Typography>
      <GridWrapper spacing={spacing(3)} mb={spacing(3)}>
        <GridItem xs={12} md={6}>
          <CFileInputAsyncControlled
            label='Receituário*'
            placeholder='Insira aqui o receituário*'
            accept='.pdf, image/*'
            name='prescriptionFile'
            onUploadFunc={handleAsyncUploadPrescription}
          />
        </GridItem>
        <GridItem xs={12} md={6}>
          <CDatePickerControlled
            label='Data de emissão do receituário*'
            name='emissionDate'
            maxDate={dayjs()}
          />
        </GridItem>
      </GridWrapper>

      <CAccordionList
        options={fields}
        renderItem={(_, index) => {
          const isExpanded = getIsExpanded(index)
          const title = 'Medicamento ' + (index + 1)

          return (
            <CAccordion expanded={isExpanded} onChange={handleChange(index)} title={title}>
              <CAccordionBody
                {...(fields.length > 1 && {
                  secondaryButton: (
                    <DeleteIconButton onDelete={() => handleRemoveMedicine(index)} />
                  ),
                })}
              >
                <Box mt={spacing(2)}>
                  <FormMedicine
                    prefixName={`${prefixMedicine}.${index}.`}
                    concentrationUnitOptions={concentrationUnitOptions}
                    dosageUnitOptions={dosageUnitOptions}
                    scheduledMedicineOptions={scheduledMedicineOptions}
                    handleAsyncUpload={handleAsyncUploadMedicine}
                  />
                </Box>
              </CAccordionBody>
            </CAccordion>
          )
        }}
      />

      <Box mt={spacing(3)} display='flex' justifyContent='flex-end'>
        <Button variant='outlined' onClick={() => handleAddMedicine()} size='small'>
          Adicionar mais medicamento
        </Button>
      </Box>
    </Box>
  )
}
