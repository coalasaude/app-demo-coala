import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { get } from 'lodash'
import { Box, ButtonProps, FormHelperText } from '@mui/material'

import FileInput from '@/components/FileReader'

interface IFileReader {
  name: string
  accept: string
  children?: React.ReactNode
  error?: string
  ButtonProps?: ButtonProps
  contentStyle?: React.CSSProperties
  multiple?: boolean
}
export const CFileReader = ({
  name,
  children,
  ButtonProps,
  error,
  contentStyle,
  ...props
}: IFileReader) => {
  const { control, formState } = useFormContext()
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { ref, value, ...others } = field
        const errorMessage = get(formState?.errors, `${name}.message`) || error
        return (
          <>
            <FileInput
              {...others}
              {...props}
              {...ButtonProps}
              containerStyle={contentStyle}
              onChange={(e) => {
                const file = get(e, 'currentTarget.files')
                field.onChange(file)
              }}
            >
              {children && children}
            </FileInput>
            {value?.length > 0 && (
              <>
                {!!props.multiple && (
                  <Box mt={1}>
                    <b>Arquivos selecionados: </b>
                    {Array.from(value)
                      .map((file: any) => file.name)
                      .join(', ')}
                  </Box>
                )}
                {!props.multiple && (
                  <Box mt={1}>
                    <b>Arquivo selecionado: </b> {value?.[0].name}
                  </Box>
                )}
              </>
            )}
            {errorMessage && <FormHelperText error>{errorMessage as string}</FormHelperText>}
          </>
        )
      }}
    />
  )
}
