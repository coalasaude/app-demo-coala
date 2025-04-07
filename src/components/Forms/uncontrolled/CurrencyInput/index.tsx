import React from 'react'
import { NumericFormat, NumericFormatProps } from 'react-number-format'

export interface NumberFormatCustomProps extends NumericFormatProps {
  onChange: (event: { currentTarget: { name: string; value: string } }) => void
  prefix?: string
  name: string
  thousandSeparator?: string
}

const CurrencyInput = React.forwardRef<NumberFormatCustomProps, NumberFormatCustomProps>(
  (props, ref) => {
    const { onChange, prefix, thousandSeparator, decimalScale, fixedDecimalScale, ...other } = props

    return (
      <NumericFormat
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            currentTarget: {
              name: props.name,
              value: values.value,
            },
          })
        }}
        valueIsNumericString
        prefix={prefix === undefined ? 'R$ ' : prefix}
        decimalScale={decimalScale || 2}
        fixedDecimalScale={fixedDecimalScale !== undefined ? fixedDecimalScale : true}
        thousandSeparator={thousandSeparator === undefined ? '.' : thousandSeparator}
        decimalSeparator=','
        allowNegative={false}
        {...other}
      />
    )
  }
)

CurrencyInput.displayName = 'CurrencyInput'

export default CurrencyInput
