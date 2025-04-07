import { UseFormReturn } from 'react-hook-form'

export interface PasswordFormData {
  hasPassword: boolean
  oldPassword: null
  password: string
  passwordConfirm: string
}

export interface PasswordFormProps {
  hasPassword: boolean
  form: UseFormReturn<PasswordFormData>
  passwordScore: number
  onSubmit: (values: any) => Promise<void>
  currentData: {
    bgColor: string
    text: string
  }
}
