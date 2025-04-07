import { Table, TableBody, TableCell, TableContainer, TableHead } from '@mui/material'
import { useRouter } from 'next/router'

import { NEW_ROUTES } from '@/constants/routes'
import { bindPathParams } from '@/utils/bindParams'
import { ProfileModel } from '@/v3/domain/@v2/users/profiles/profile.model'
import { CTableRow } from '@/v3/presentation/newComponents/atoms/CTableRow/CTableRow'

type ProfilesTableProps = {
  data: ProfileModel[]
}

export const ProfilesTable = ({ data }: ProfilesTableProps) => {
  const router = useRouter()

  const handleRowClick = (id: number) => {
    const path = bindPathParams(NEW_ROUTES.AUTHENTICATED.USERS.PROFILES.VIEW.path, { id })
    router.push(path)
  }

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <CTableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Tipo do perfil</TableCell>
              <TableCell>Tipo institucional</TableCell>
            </CTableRow>
          </TableHead>

          <TableBody>
            {data?.map((row) => (
              <CTableRow key={row.id} onClick={() => handleRowClick(row.id)}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.getFormattedType()}</TableCell>
                <TableCell>{row.institutionType || '-'}</TableCell>
              </CTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
