import { get, useFormContext } from 'react-hook-form'

import { ICFileInput, CFileInput } from '../../../molecules/CFileInput/CFileInput'

export type CFileInputControlledProps = ICFileInput & {
  name: string
  label: string
  accept: string
  placeholder?: string
  loading?: boolean
}

export const CFileInputControlled = ({
  name,
  accept,
  label = 'Upload de documento',
  placeholder = label,
  ...props
}: CFileInputControlledProps) => {
  const { setValue, watch, formState, control } = useFormContext()
  const file = watch(name)
  const errors = formState.errors

  const handleFileChange = (e: any) => {
    if (e.target.files.length > 0) {
      control._formState.isDirty = true
      setValue(name, e.target.files[0], { shouldValidate: true, shouldDirty: true })
    } else {
      setValue(name, null, { shouldValidate: true, shouldDirty: true })
    }
  }

  const error = errors[name]?.message
  const errorMessage = get(formState?.errors, `${name}.message`) || error

  return (
    <CFileInput
      accept={accept}
      label={file ? label : placeholder}
      placeholder={file ? label : placeholder}
      onChange={handleFileChange}
      InputLabelProps={{ shrink: file || props.loading ? true : false }}
      errorMessage={errorMessage}
      defaultValue={file?.name}
      {...props}
    />
  )
}
