import { Button, ButtonProps } from '@mui/material'
import { createRef, SyntheticEvent } from 'react'

import useMediaQuery from '@/hooks/useMediaQuery'

import { Container } from './styles'

interface IFileInput extends ButtonProps {
  accept: string
  onChange?(event: SyntheticEvent): void
  variant?: 'text' | 'outlined' | 'contained'
  value?: any
  children: React.ReactNode
  containerStyle?: React.CSSProperties
  multiple?: boolean
}

const FileInput: React.FC<IFileInput> = ({
  children,
  accept,
  onChange,
  variant,
  color,
  value,
  containerStyle,
  multiple,
  ...props
}) => {
  const fileInput = createRef<HTMLInputElement>()
  const isMobile = useMediaQuery('sm')
  return (
    <Container style={containerStyle}>
      <Button
        onClick={() => fileInput && fileInput.current?.click()}
        variant={variant}
        color={color}
        fullWidth={isMobile}
        {...props}
      >
        {children}
      </Button>
      <input
        ref={fileInput}
        type='file'
        accept={accept}
        onChange={onChange}
        value={value}
        multiple={multiple ? multiple : false}
      />
    </Container>
  )
}

export default FileInput
