import { FormControl, FormControlLabel, FormHelperText, Grid, Typography } from '@mui/material'
import { get } from 'lodash'
import { Controller, useFormContext } from 'react-hook-form'

import { CCheckbox } from '@/v3/presentation/newComponents'

import { spacing } from '../../utils/spacing'

import { ICCheckboxGridProps } from './types'

export function CCheckboxGrid<T>({
  label,
  name,
  rules,
  errorMessage,
  options,
  transform,
  maxItemColumns = 4,
  numGridColumns = 4,
  maxItemColumnsMobile = 2,
  numGridColumnsMobile = 2,
  onSelectedValuesChange,
}: ICCheckboxGridProps<T>) {
  const { control } = useFormContext()

  const handleCheckboxClick = (
    optionValue: T,
    currentValue: T[] | undefined,
    onChange: (value: T[]) => void,
  ) => {
    let newValue: T[]
    if (currentValue?.includes(optionValue)) {
      newValue = currentValue?.filter((value) => value !== optionValue)
    } else {
      newValue = currentValue ? [...currentValue, optionValue] : [optionValue]
    }
    if (transform) {
      newValue = newValue.map((value) => transform(value))
    }
    if (onSelectedValuesChange) {
      onSelectedValuesChange(newValue)
    }

    onChange(newValue)
  }

  const columnWidth = `${100 / numGridColumns}%`
  const columnWidthMobile = `${100 / numGridColumnsMobile}%`

  const getLastCollumnWidth = (maxItemColumns: number, numGridColumns: number) => {
    const numColumns = numGridColumns - maxItemColumns + 1

    return `${(100 / numGridColumns) * numColumns}%`
  }

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, formState }) => {
        const { value: selectedValues, onChange } = field
        const error = get(formState?.errors, `${name}.message`) || errorMessage

        return (
          <FormControl fullWidth error={!!error}>
            {label && (
              <Typography color={!!error ? 'error' : undefined} mb={spacing(2)}>
                {label}
              </Typography>
            )}
            <div>
              <Grid container spacing={spacing(2)} pl={spacing(1.5)}>
                {options.map((option, index) => {
                  const isLastItem = (index + 1) % maxItemColumns === 0
                  const isLastItemMobile = (index + 1) % maxItemColumnsMobile === 0

                  const gridValue = isLastItem
                    ? getLastCollumnWidth(maxItemColumns, numGridColumns)
                    : columnWidth
                  const gridValueMobile = isLastItemMobile
                    ? getLastCollumnWidth(maxItemColumnsMobile, numGridColumnsMobile)
                    : columnWidthMobile

                  return (
                    <Grid
                      item
                      sx={{ flexBasis: [gridValueMobile, gridValueMobile, gridValue] }}
                      key={String(option.value)}
                    >
                      <FormControlLabel
                        label={option.label}
                        sx={{ color: !!error ? 'error.main' : undefined }}
                        control={
                          <CCheckbox
                            onClick={() =>
                              handleCheckboxClick(option.value, selectedValues, onChange)
                            }
                            checked={(selectedValues ?? []).includes(option.value)}
                            value={option.value}
                            sx={{ color: !!error ? 'error.main' : undefined }}
                          />
                        }
                      />
                    </Grid>
                  )
                })}
              </Grid>
            </div>
            {error && <FormHelperText error>{error as string}</FormHelperText>}
          </FormControl>
        )
      }}
    />
  )
}
