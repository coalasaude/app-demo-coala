import { Box } from '@mui/material'
import { useEffect, useRef, useState } from 'react'

import { StatusDescriptionOptions } from '@/constants/status'
import { UserStatus } from '@/types/user'
import { CFilterDrawer } from '@/v3/presentation/newComponents/layout/CFilterDrawer'
import {
  EXPERIMENTAL_SearchInput,
  ISearchInputRef,
} from '@/v3/presentation/components/EXPERIMENTAL_SearchInput'
import { InstitutionSelectInput } from '@/v3/presentation/newComponents/implementations/form/InstitutionSelectInput'
import CSelect from '@/v3/presentation/newComponents/atoms/CSelect'

import { IDrawerFilterUserListTable } from './type'

export const DrawerFilterUserListTable = ({
  open,
  onClose,
  setFilters,
  filters,
  profiles,
}: IDrawerFilterUserListTable) => {
  const [status, setStatus] = useState(filters.status)
  const [profileId, setProfileId] = useState(filters.profileId)
  const [institutionId, setInstitutionId] = useState(filters.institutionId)

  useEffect(() => {
    if (institutionId != filters.institutionId) setInstitutionId(filters.institutionId)
    if (profileId !== filters.profileId) {
      setProfileId(filters.profileId || undefined)
    }
    if (status != filters.status) setStatus(filters.status || undefined)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.institutionId, filters.profileId, filters.status])

  const emailRef = useRef<ISearchInputRef>(null)
  const phoneRef = useRef<ISearchInputRef>(null)

  const handleClose = () => {
    setFilters({
      searchEmail: emailRef.current?.value(),
      searchTelephone: phoneRef.current?.value(),
      status,
      institutionId,
      profileId,
    })
    onClose()
  }

  const onClearFilter = () => {
    setStatus(undefined)
    setProfileId(undefined)
    setInstitutionId(undefined)
    emailRef.current?.setValue('')
    phoneRef.current?.setValue('')
  }

  return (
    <CFilterDrawer
      open={open}
      onClose={handleClose}
      onApply={handleClose}
      onClear={() => onClearFilter()}
    >
      <Box display='flex' flexDirection='column' gap={2}>
        <EXPERIMENTAL_SearchInput
          inputRef={emailRef}
          name='search_input_user'
          withDebounce={false}
          placeholder='Email'
          label={'Email'}
          defaultValue={filters.searchEmail}
        />
        <EXPERIMENTAL_SearchInput
          inputRef={phoneRef}
          name='search_input_phone'
          withDebounce={false}
          placeholder='Telefone'
          label={'Telefone'}
          defaultValue={filters.searchTelephone}
        />
        <CSelect
          label='Status'
          name='status'
          fullWidth={true}
          options={StatusDescriptionOptions}
          onChange={(e) => setStatus(e.target.value as UserStatus)}
          nullOptionText='Todos'
          value={status}
        />
        <CSelect
          label='Tipo'
          name='profile'
          fullWidth={true}
          options={profiles}
          nullOptionText='Todos'
          onChange={(e) => setProfileId(e.target.value as number)}
          value={profileId}
        />
        <InstitutionSelectInput
          label='Instituição'
          setInstitutionId={(id) => setInstitutionId(id!)}
          institutionId={institutionId}
        />
      </Box>
    </CFilterDrawer>
  )
}
