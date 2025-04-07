import { debounce, get } from 'lodash'
import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { Box, Typography } from '@mui/material'

import { ICAutocompleteUncontrolled } from '@/v3/presentation/components/AutocompleteInput'
import { CAutoComplete } from '@/components/Forms'
import { UserModel } from '@/v3/domain/@v2/appointment/user.model'

export interface IUserSelectInputForm extends Partial<ICAutocompleteUncontrolled> {
  name: string
  label?: string
  error?: string
  disabled?: boolean
  users: UserModel[] | undefined
  onSearch?: (value: string) => void
  isLoading: boolean
  options?: { value: number | null; label: string }[]
}

export const UserSelectInputForm = ({
  name,
  error,
  label,
  disabled,
  users,
  onSearch,
  isLoading,
  ...props
}: IUserSelectInputForm) => {
  const { watch, setValue } = useFormContext()

  const doUserFilter = debounce((value) => {
    onSearch?.(value)
  }, 600)

  const autoCompleteOptions = useMemo(() => {
    const usersOptions = [...(users ?? [])]?.map((user) => ({
      value: user.id,
      label: user.fullNameWithCPF,
    }))

    const allOptions = [...(props.options || []), ...usersOptions]

    return allOptions
  }, [users, props.options])

  return (
    <>
      {label && (
        <Box mb={1}>
          <Typography variant='h4'>{label}</Typography>
        </Box>
      )}
      <CAutoComplete
        name={name}
        options={autoCompleteOptions}
        errorMessage={get(error, `data.${name}`)}
        isLoading={isLoading}
        value={autoCompleteOptions?.find((option) => option.value === watch(name)?.id) || null}
        onInputChange={(e, value, reason) => {
          if (!!e && reason === 'clear') {
            doUserFilter(undefined)
            return setValue(name, null)
          }
          if (!!e && reason === 'input') {
            const removedCpf = value?.split('(')?.[0]?.trim() || value
            doUserFilter(removedCpf)
          }
        }}
        disabled={disabled}
        onChange={(_, option) => {
          setValue(name, option?.value)
        }}
        {...props}
      />
    </>
  )
}
