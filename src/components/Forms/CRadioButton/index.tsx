import React from 'react'
import {
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  RadioGroupProps,
  RadioProps,
  SxProps,
} from '@mui/material'
import { get } from 'lodash'
import { Controller, UseControllerProps, useFormContext } from 'react-hook-form'

interface IRadioButton
  extends Omit<UseControllerProps<any>, 'control'>,
    Partial<Omit<RadioProps, 'name' | 'defaultValue'>> {
  options: {
    value: any
    label: string
    labelStyle?: SxProps
    radioStyle?: SxProps
  }[]
  error?: string
  label?: string
  radioProps?: RadioGroupProps
  transform?: ((value: any) => any)[]
  marginRight?: number
}

export const CRadio = ({
  name,
  rules,
  onBlur: onBlurC,
  error,
  label,
  options,
  radioProps,
  transform,
  marginRight,
  ...props
}: IRadioButton) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, formState }) => {
        const { onBlur, ...fieldProps } = field
        const errorMessage = get(formState?.errors, `${name}.message`) || error

        return (
          <FormControl error={!!errorMessage}>
            {label && <FormLabel id={name}>{label}</FormLabel>}
            <RadioGroup
              name={name}
              row={radioProps?.row !== undefined ? radioProps.row : true}
              value={field.value}
            >
              {options.map((option) => (
                <Box key={option.value} mr={marginRight ? marginRight : 0}>
                  <FormControlLabel
                    sx={option?.labelStyle}
                    control={
                      <Radio
                        {...fieldProps}
                        {...props}
                        sx={option?.radioStyle || props.sx}
                        onChange={(e, checked) => {
                          let value = e.currentTarget.value
                          if (transform)
                            value = transform.reduce(
                              (result, currentTransform) => currentTransform(result),
                              value
                            )
                          field.onChange(value)
                          if (props.onChange) {
                            props.onChange(e, checked)
                          }
                        }}
                        onBlur={(e) => {
                          if (onBlurC) {
                            onBlurC(e)
                          }
                          onBlur()
                        }}
                        value={option.value}
                      />
                    }
                    label={option.label}
                  />
                </Box>
              ))}
            </RadioGroup>
            {errorMessage && <FormHelperText error>{errorMessage as string}</FormHelperText>}
          </FormControl>
        )
      }}
    />
  )
}
