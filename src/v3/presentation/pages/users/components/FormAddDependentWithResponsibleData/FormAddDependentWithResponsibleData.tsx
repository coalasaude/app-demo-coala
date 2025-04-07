import React from 'react'

import { GridItem, GridWrapper } from '@/components/Grid'
import { InstitutionSelectInputForm } from '@/v3/presentation/newComponents/implementations/form/InstitutionSelectInput/InstitutionSelectInputForm'
import { CInputControlled } from '@/v3/presentation/newComponents'
import { removeAccents } from '@/v3/utils/remove-accents'
import { nameNormalizer } from '@/components/Forms/normalizers/nameNormalizer'
import { UserModel } from '@/v3/domain/@v2/appointment/user.model'

import { UserSelectInputForm } from '../../../appointment/Emergency/components/Appointment/FormAppointment/components'

interface IFormAddDependentWithResponsibleData {
  users: UserModel[] | undefined
  isLoading: boolean
  setSearchName: any
}

export const FormAddDependentWithResponsibleData = ({
  users,
  isLoading,
  setSearchName,
}: IFormAddDependentWithResponsibleData) => {
  return (
    <>
      <GridWrapper>
        <GridItem xs={12} md={6}>
          <InstitutionSelectInputForm label='Digite a instituição*' name='institutionId' />
        </GridItem>
      </GridWrapper>
      <GridWrapper>
        <GridItem xs={12} md={6}>
          <UserSelectInputForm
            placeholder='Digite o nome*'
            name='nameOrId'
            getOptionLabel={(option) => users?.find((user) => user.id === option.value)?.name || ''}
            freeSolo
            blurOnSelect
            fullWidth
            renderOption={(props, option) => <span {...props}>{option.label}</span>}
            isLoading={isLoading}
            users={users || []}
            onSearch={(value) => setSearchName(removeAccents(value))}
          />
        </GridItem>
        <GridItem xs={12} md={6}>
          <CInputControlled
            placeholder='Digite o sobrenome*'
            name='lastname'
            label='Sobrenome*'
            transform={{ output: nameNormalizer }}
            fullWidth
          />
        </GridItem>
      </GridWrapper>
    </>
  )
}
