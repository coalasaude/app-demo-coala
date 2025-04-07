import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material'
import { get } from 'lodash'
import { ChangeEvent } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { spacing } from '../../utils/spacing'

import { ICRadioGridProps } from './types'

export function CRadioGrid<T, R>({
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
  gridItemsSpacing,
  onChange: onInputChange,
}: ICRadioGridProps<T, R>) {
  const { control } = useFormContext()

  const onChangeRadio = (e: ChangeEvent<HTMLInputElement>, onChange: (...event: any[]) => void) => {
    let value: R | string = e.currentTarget.value
    if (transform) value = transform(value)
    onChange(value)
    onInputChange?.(value as any)
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
        const { ...fieldProps } = field
        const error = get(formState?.errors, `${name}.message`) || errorMessage

        return (
          <FormControl fullWidth error={!!error}>
            {label && (
              <Typography color={!!error ? 'error' : undefined} mb={spacing(2)}>
                {label}
              </Typography>
            )}
            <RadioGroup name={name} value={field.value}>
              <Grid container spacing={spacing(1.5)} pl={spacing(1.5)}>
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
                      sx={{
                        flexBasis: gridItemsSpacing
                          ? gridItemsSpacing
                          : [gridValueMobile, gridValue],
                      }}
                      key={String(option.value)}
                    >
                      <FormControlLabel
                        label={option.label}
                        sx={{ color: !!error ? 'error.main' : undefined }}
                        control={
                          <Radio
                            {...fieldProps}
                            onChange={(e) => onChangeRadio(e, field.onChange)}
                            value={option.value}
                            sx={{ color: !!error ? 'error.main' : undefined }}
                          />
                        }
                      />
                    </Grid>
                  )
                })}
              </Grid>
            </RadioGroup>
            {error && <FormHelperText error>{error as string}</FormHelperText>}
          </FormControl>
        )
      }}
    />
  )
}
