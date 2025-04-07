import { ChangeEvent, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { FileAsync } from '@/types/FileAsync'

import { CFileInputControlled, CFileInputControlledProps } from '../CFileInputControlled'

export type CFileInputAsyncControlledProps = CFileInputControlledProps & {
  onUploadFunc?: (file: File) => Promise<number>
}

export const CFileInputAsyncControlled = ({
  name,
  onUploadFunc,
  ...props
}: CFileInputAsyncControlledProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const { setValue, control } = useFormContext()

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsLoading(true)
      onUploadFunc?.(e.target.files[0])
        .then((documentId) => {
          const file: FileAsync = e.target.files![0]
          file.id = documentId

          control._formState.isDirty = true
          setValue(name, file, { shouldValidate: true, shouldDirty: true })
        })
        .finally(() => {
          setIsLoading(false)
        })
    } else {
      setValue(name, null, { shouldValidate: true, shouldDirty: true })
    }
  }

  return (
    <CFileInputControlled
      name={name}
      loading={isLoading}
      {...(onUploadFunc && {
        onChange: handleUpload,
      })}
      {...props}
    />
  )
}
