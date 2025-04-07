import React, { useEffect, useMemo } from 'react'
import { get, range } from 'lodash'
import { Box, Typography } from '@mui/material'
import { useFormContext } from 'react-hook-form'

import { CSelectControlled } from '@/components/Forms'
import { GridItem, GridWrapper } from '@/components/Grid'
import { onlyNumsNormalizer } from '@/components/Forms/normalizers/onlyNumsNormalizer'
import { CRadioButtonGroupControlled } from '@/v3/presentation/newComponents'
import { CInputControlled } from '@/v3/presentation/newComponents'

export const MedicineForm = ({
  error,
  concentrationUnitOptions,
  dosageUnitOptions,
  scheduledMedicineOptions,
  basename,
  index,
  prescription,
}: {
  error: any
  concentrationUnitOptions: { value: number; label: string }[]
  scheduledMedicineOptions: { value: number; label: string }[]
  dosageUnitOptions: { value: number; label: string }[]
  basename?: string
  index?: number
  prescription?: boolean
}) => {
  const fieldBaseName = useMemo<string>(() => basename || '', [basename])
  const { watch, setValue } = useFormContext()
  const [continuousUsage, useIfNecessary] = watch([
    `${fieldBaseName}continuous_usage`,
    `${fieldBaseName}use_if_necessary`,
  ])

  useEffect(() => {
    if (useIfNecessary === 'true') {
      setValue(`${fieldBaseName}start_hour`, '')
    } else if (useIfNecessary === 'false') {
      setValue(`${fieldBaseName}recommendation`, '')
    }
  }, [useIfNecessary, setValue, fieldBaseName])

  useEffect(() => {
    if (continuousUsage === 'true') {
      setValue(`${fieldBaseName}valid_until`, '')
    }
  }, [continuousUsage, setValue, fieldBaseName])

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedText = event.clipboardData.getData('Text')

    if (pastedText) {
      const values = pastedText.split('\t')
      event.preventDefault()

      setValue(`${fieldBaseName}name`, '')
      setValue(`${fieldBaseName}name`, values[0] || '')

      setValue(`${fieldBaseName}concentration`, values[1] || '')

      const concentrationUnit = concentrationUnitOptions.find(
        (option) => option.label === values[2],
      )
      setValue(
        `${fieldBaseName}medicine_concentration_unit_id`,
        concentrationUnit ? concentrationUnit.value : null,
      )

      setValue(`${fieldBaseName}dosage`, values[3] || '')

      const dosageUnit = dosageUnitOptions.find((option) => option.label === values[4])
      setValue(`${fieldBaseName}medicine_dosage_unit_id`, dosageUnit ? dosageUnit.value : null)

      const scheduledMedicine = scheduledMedicineOptions.find(
        (option) => option.label === values[5],
      )
      setValue(
        `${fieldBaseName}scheduled_medicine_id`,
        scheduledMedicine ? scheduledMedicine.value : null,
      )
    }
  }

  return (
    <>
      <Typography variant='h4' mb={2}>
        Dados do medicamento {index !== undefined ? `#${index + 1}` : ''}
      </Typography>

      <GridWrapper>
        <GridItem xs={12} md={4}>
          <CInputControlled
            name={`${fieldBaseName}name`}
            variant='outlined'
            label='Nome do medicamento'
            placeholder='Digite o nome do medicamento'
            error={get(error, 'data.name')}
            onPaste={handlePaste}
          />
        </GridItem>
        <GridItem xs={6} md={4}>
          <CInputControlled
            name={`${fieldBaseName}concentration`}
            variant='outlined'
            inputType='currency'
            placeholder='Digite a concentração'
            label='Concentração'
            error={get(error, 'data.concentration')}
            currencyInputProps={{
              prefix: '',
              fixedDecimalScale: false,
            }}
          />
        </GridItem>
        <GridItem xs={6} md={4}>
          <CSelectControlled
            name={`${fieldBaseName}medicine_concentration_unit_id`}
            label='Unidade de concentração'
            placeholder='Unidade de concentração'
            error={get(error, 'data.medicine_concentration_unit_id')}
            options={concentrationUnitOptions}
            showClearButton={false}
            nullOptionText=''
            native
          />
        </GridItem>
        <GridItem xs={6} md={4}>
          <CInputControlled
            name={`${fieldBaseName}dosage`}
            placeholder='Digite a dosagem'
            variant='outlined'
            label='Dosagem'
            error={get(error, 'data.dosage')}
            currencyInputProps={{
              prefix: '',
              fixedDecimalScale: false,
            }}
            inputType='currency'
          />
        </GridItem>
        <GridItem xs={6} md={4}>
          <CSelectControlled
            name={`${fieldBaseName}medicine_dosage_unit_id`}
            label='Unidade da dose'
            placeholder='Unidade da dose'
            error={get(error, 'data.medicine_dosage_unit_id')}
            options={dosageUnitOptions}
            showClearButton={false}
            nullOptionText=''
            native
          />
        </GridItem>
        <GridItem xs={12} md={4}>
          <CSelectControlled
            name={`${fieldBaseName}scheduled_medicine_id`}
            label='Periodicidade'
            error={get(error, 'data.scheduled_medicine_id')}
            options={scheduledMedicineOptions}
            showClearButton={false}
            nullOptionText=''
            native
          />
        </GridItem>
      </GridWrapper>
      <Box mt={2} />
      <GridWrapper>
        <GridItem xs={12} md={12}>
          <Typography variant='h4' mb={2}>
            Fazer uso somente se necessário
          </Typography>
          <Box mt={-2}>
            <CRadioButtonGroupControlled
              row
              name={`${fieldBaseName}use_if_necessary`}
              options={[
                { value: true, label: 'Sim' },
                { value: false, label: 'Não' },
              ]}
            />
          </Box>
        </GridItem>
        {useIfNecessary === 'false' && !prescription && (
          <GridItem xs={12} md={8} mt={2}>
            <CSelectControlled
              name={`${fieldBaseName}start_hour`}
              placeholder='Hora de início do período'
              error={get(error, 'data.start_hour')}
              options={range(0, 24).map((value) => ({
                value,
                label: `${value}h`,
              }))}
              showClearButton={false}
              nullOptionText=''
              native
            />
          </GridItem>
        )}
        {useIfNecessary === 'true' && (
          <GridItem xs={12} md={6}>
            <CInputControlled
              name={`${fieldBaseName}recommendation`}
              placeholder='Digite a condição para uso'
              variant='outlined'
              label='Condição para uso'
              error={get(error, 'data.recommendation')}
            />
          </GridItem>
        )}
      </GridWrapper>
      <Box mt={2} />
      <GridWrapper>
        <GridItem xs={12} md={12}>
          <Typography variant='h4' mb={2}>
            Medicamento de uso contínuo
          </Typography>

          <Box mt={-2}>
            <CRadioButtonGroupControlled
              row
              name={`${fieldBaseName}continuous_usage`}
              options={[
                { value: true, label: 'Sim' },
                { value: false, label: 'Não' },
              ]}
            />
          </Box>
        </GridItem>
        {(continuousUsage === 'false' || !continuousUsage) && (
          <GridItem xs={12} md={4}>
            <CInputControlled
              name={`${fieldBaseName}valid_until`}
              variant='outlined'
              label='Dias de tratamento'
              placeholder='Digite a quantidade de dias de tratamento'
              error={get(error, 'data.valid_until')}
              transform={{
                output: [onlyNumsNormalizer],
              }}
            />
          </GridItem>
        )}
        <GridItem xs={12} md={8}>
          <CInputControlled
            placeholder='Digite a observação'
            name={`${fieldBaseName}observation`}
            variant='outlined'
            label='Observação'
            error={get(error, 'data.observation')}
          />
        </GridItem>
      </GridWrapper>
    </>
  )
}
