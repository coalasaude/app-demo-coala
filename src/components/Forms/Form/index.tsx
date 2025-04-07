import React, { BaseSyntheticEvent } from 'react'
import { FormProvider, UseFormReturn } from 'react-hook-form'

interface IForm {
  form: UseFormReturn<any, any>
  children: React.ReactNode
  formRef?: React.RefObject<HTMLFormElement>
  // eslint-disable-next-line @typescript-eslint/ban-types
  onSubmit(data: any, event?: BaseSyntheticEvent<object, any, any> | undefined): any
}
export const CForm: React.FC<
  IForm &
    Omit<
      React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>,
      'onSubmit'
    >
> = (props) => {
  const { form, onSubmit, ...others } = props

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} {...others}>
        {props.children}
      </form>
    </FormProvider>
  )
}
