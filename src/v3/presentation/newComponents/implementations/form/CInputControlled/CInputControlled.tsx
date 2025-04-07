import React from 'react'
import { Controller, useFormContext, UseControllerProps } from 'react-hook-form'
import { get } from 'lodash'

import CInput, { CInputProps } from '../../../atoms/CInput'
type TransformationFunction = (value: any) => any

export interface CInputControlledProps extends Omit<CInputProps, 'value' | 'onChange' | 'ref'> {
  name: string
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => void
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  transform?: {
    input?: TransformationFunction | TransformationFunction[]
    output?: TransformationFunction | TransformationFunction[]
  }
  onPaste?: (e: React.ClipboardEvent<HTMLInputElement>) => void
  rules?: UseControllerProps['rules']
}

const CInputControlled = React.forwardRef<any, CInputControlledProps>(
  ({ name, transform, ...props }, ref) => {
    const { control } = useFormContext()
    const { rules, ...restProps } = props

    const applyTransformations = (value: any, type: 'input' | 'output') => {
      const transformationFunction = type === 'input' ? transform?.input : transform?.output
      if (Array.isArray(transformationFunction)) {
        return transformationFunction.reduce((acc, func) => func(acc), value)
      } else if (transformationFunction instanceof Function) {
        return transformationFunction(value)
      }
      return value
    }

    return (
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, formState }) => (
          <CInput
            {...field}
            {...restProps}
            ref={ref}
            error={!!get(formState.errors, name)?.message}
            helperText={
              (get(formState.errors, name)?.message as unknown as string) || restProps.helperText
            }
            value={applyTransformations(field.value || '', 'output')}
            onChange={(e) => {
              const transformedValue = applyTransformations(e.currentTarget.value, 'input')
              field.onChange(transformedValue)
              if (props.onChange) {
                props.onChange(e)
              }
            }}
            onBlur={(e) => {
              if (props.onBlur) {
                props.onBlur(e)
              }
              field.onBlur()
            }}
            onPaste={props.onPaste}
          />
        )}
      />
    )
  },
)

CInputControlled.displayName = 'CInputControlled'
export default CInputControlled
