import { Box, Typography } from '@mui/material'
import { useState } from 'react'

import { CDialogue } from '@/v3/presentation/components/Modal'
import { CCheckbox } from '@/v3/presentation/newComponents'

type InstitutionModalProps = {
  onConfirm: (profileId: number, institutionId: number) => Promise<void>
  roles: {
    id: number
    profile: {
      id: number
    }
    institutionName?: string
    institutionId?: number
  }[]
}

export const InstitutionModal = ({ onConfirm, roles }: InstitutionModalProps) => {
  const [selectedRole, setSelectedRole] = useState(new Set<number>())

  const handleSelect = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const newSelectedInstitution = new Set(selectedRole)
    if (event.target.checked) {
      newSelectedInstitution.add(id)
    } else {
      newSelectedInstitution.delete(id)
    }
    setSelectedRole(newSelectedInstitution)
  }

  const onReactiveUser = async () => {
    const ids = Array.from(selectedRole)
    const rolesFiltered = roles.filter(({ id }) => ids.includes(id))
    await Promise.all(
      rolesFiltered.map((role) => onConfirm(role.profile.id, role.institutionId || 0)),
    )
  }

  return (
    <CDialogue
      title='Revincular usuário'
      confirmButtonLabel='Revincular'
      cancelButtonLabel='Cancelar'
      onConfirm={onReactiveUser}
      disabled={selectedRole.size === 0}
      description={
        <>
          <Typography>
            Selecione abaixo as instituições que deseja revincular este usuário
          </Typography>
          {roles.map(({ institutionName, id }) => (
            <Box display='flex' alignItems='center' key={id}>
              <CCheckbox
                onChange={(event) => handleSelect(event, id)}
                checked={selectedRole.has(id)}
                key={id}
                value={id}
              />
              <Typography>{institutionName}</Typography>
            </Box>
          ))}
        </>
      }
    />
  )
}
