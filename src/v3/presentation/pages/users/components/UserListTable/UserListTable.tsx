import React from 'react'
import {
  Box,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Typography,
  IconButton,
} from '@mui/material'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety'
import AutorenewIcon from '@mui/icons-material/Autorenew'

import CTableRow from '@/v3/presentation/newComponents/atoms/CTableRow'
import { limit } from '@/constants/api'
import { NotFound } from '@/v3/presentation/components/NotFound'
import { TableBodySkeleton } from '@/components/Skeletons/TableBodySkeleton'
import { AvatarInfo } from '@/v3/presentation/components/AvatarInfo'
import { EXPERIMENTAL_TableSortLabel } from '@/v3/presentation/components/Table/EXPERIMENTAL_TableSortLabel/EXPERIMENTAL_TableSortLabel'
import { CAvatar, CCheckbox, CTooltip } from '@/v3/presentation/newComponents'
import CPagination from '@/v3/presentation/newComponents/molecules/CPagination'
import { Permissions } from '@/constants/permissions'
import { CDialogue, useModalContext } from '@/v3/presentation/components/Modal'
import { useHasPermission } from '@/hooks/useHasPermission'
import { useMutateUnlinkRole } from '@/v3/presentation/hooks/api/@v2/users/roles/useMutateUnlinkRole'
import { target } from '@/v3/presentation/newComponents/atoms/CJoyride/constants/target'
import { useLayout } from '@/hooks/useLayout'
import { UserStatus } from '@/types/user'

import { AppointmentStatusChip } from '../../../appointment/Emergency/components/AppointmentStatusChip'

import { IUserFilterFields, IUserListTable } from './type'
import UserOptions from './components/UserOptions'

export const UserListTable = ({
  users = [],
  count = 0,
  onClickUserRow,
  onChangePage,
  isLoading,
  offset = 0,
  direction,
  orderBy,
  setFilters,
  onChangeSelectedUsers,
  selectedUsers,
  institutionId,
  onNotifyUser,
  onReactivateUser,
  brandId,
  networkId,
}: IUserListTable) => {
  const [canManageRole] = useHasPermission([Permissions.MANAGE_ROLE])
  const unlinkRoleMutate = useMutateUnlinkRole()
  const { handleModal } = useModalContext()
  const { showSnackBar } = useLayout()

  const onDelete = (userId: number, ids: number[]) => {
    const action = async () => {
      const promises = ids.map((id) => unlinkRoleMutate.mutateAsync({ userId, roleId: id }))
      await Promise.all(promises)
    }

    handleModal(
      <CDialogue
        confirmButtonLabel='Confirmar'
        onConfirm={async () => action()}
        title='Atenção'
        description='Tem certeza que deseja excluir este usuário desta instituição?'
      />,
    )
  }

  const handleCantSelectCheckbox = () => {
    showSnackBar({
      type: 'error',
      message: 'Responsável não pode ser selecionado',
    })
  }

  if (isLoading) return <TableBodySkeleton />

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <CTableRow
              sx={{
                [`& .${tableCellClasses.root}`]: {
                  borderBottom: users.length < 1 && !isLoading && 'none',
                },
              }}
            >
              <TableCell sx={{ width: ['50%', '37%'] }}>
                <EXPERIMENTAL_TableSortLabel
                  direction={direction}
                  orderBy={orderBy}
                  name='name'
                  onChange={(orderBy, direction) =>
                    setFilters({ orderBy: orderBy as IUserFilterFields['orderBy'], direction })
                  }
                >
                  Usuário
                </EXPERIMENTAL_TableSortLabel>
              </TableCell>
              <TableCell sx={{ width: ['25%', '37%'] }}>Perfil</TableCell>
              {(networkId || brandId) && (
                <TableCell sx={{ width: ['25%', '37%'] }}>Instituições</TableCell>
              )}
              <TableCell sx={{ width: ['25%', '26%'] }}>
                <EXPERIMENTAL_TableSortLabel
                  direction={direction}
                  orderBy={orderBy}
                  name='status'
                  onChange={(orderBy, direction) =>
                    setFilters({ orderBy: orderBy as IUserFilterFields['orderBy'], direction })
                  }
                >
                  Status
                </EXPERIMENTAL_TableSortLabel>
              </TableCell>
              {canManageRole && <TableCell sx={{ width: ['10%', '10%'] }}>Ações</TableCell>}
            </CTableRow>
          </TableHead>
          {!isLoading && (
            <TableBody>
              {users.map((user, index) => {
                const { label, bgColor, circleColor } = onReactivateUser
                  ? {
                      label: 'Desvinculado',
                      circleColor: '--mui-palette-grey-400',
                      bgColor: '--mui-palette-grey-100',
                    }
                  : user.getStatusFormatted()

                const roles = brandId
                  ? user.getInstitutionsByBrandId(brandId)
                  : networkId
                    ? user.getInstitutionsByNetworkId(networkId)
                    : []
                const institutions =
                  roles.length > 0 ? roles.map((role) => role.institutionName).join(', ') : '-'

                const isLastItem = index === users.length - 1
                return (
                  <CTableRow
                    key={user.id}
                    hover={!!onClickUserRow}
                    sx={{
                      [`& .${tableCellClasses.root}`]: {
                        borderBottom: isLastItem && 'none',
                      },
                    }}
                  >
                    <TableCell onClick={onClickUserRow ? () => onClickUserRow(user.id) : undefined}>
                      <Box display='flex' whiteSpace='nowrap' alignItems='center'>
                        {onChangeSelectedUsers && (
                          <CCheckbox
                            onClick={(event) => event.stopPropagation()}
                            onChange={(event) => {
                              if (user.hasRolesFromInstitution(institutionId || 0)) {
                                onChangeSelectedUsers(event, user.id)
                              } else {
                                handleCantSelectCheckbox()
                              }
                            }}
                            checked={selectedUsers?.has(user.id)}
                            disabled={!user.hasRolesFromInstitution(institutionId || 0)}
                          />
                        )}
                        <Box
                          onClick={onClickUserRow ? () => onClickUserRow(user.id) : undefined}
                          width='100%'
                        >
                          <AvatarInfo
                            imageUrl={user.image?.url}
                            subtitle={user.getNumResponsibleText()}
                            title={user.getFullName()}
                            titleComponent={
                              user.hasHealthLeaderProfile() ? (
                                <CTooltip description='Líder de Saúde' placement='top'>
                                  <HealthAndSafetyIcon
                                    sx={{
                                      color: 'var(--mui-palette-primary-main)',
                                      fontSize: '18px',
                                    }}
                                  />
                                </CTooltip>
                              ) : null
                            }
                            titleProps={{ display: 'flex', alignItems: 'center' }}
                            ImageComponent={
                              <CAvatar
                                imageUrl={user.image?.url}
                                type='photo'
                                size='large'
                                photoFallback='initials'
                                name={user.getFullName()}
                              />
                            }
                          />
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell onClick={onClickUserRow ? () => onClickUserRow(user.id) : undefined}>
                      <Typography variant='body1'>{user.getProfilesText()}</Typography>
                    </TableCell>
                    {(networkId || brandId) && (
                      <TableCell
                        onClick={onClickUserRow ? () => onClickUserRow(user.id) : undefined}
                      >
                        <Typography>{institutions}</Typography>
                      </TableCell>
                    )}

                    <TableCell onClick={onClickUserRow ? () => onClickUserRow(user.id) : undefined}>
                      <Typography>
                        <AppointmentStatusChip
                          title={label}
                          bgColor={bgColor}
                          circleColor={circleColor}
                        />
                      </Typography>
                    </TableCell>
                    {!onNotifyUser && !onReactivateUser && (
                      <>
                        {canManageRole && user.getRolesIds().length > 0 ? (
                          <TableCell
                            onClick={() => onDelete(user.id, user.getRolesIds())}
                            id={target.coalaUserListTable}
                          >
                            <IconButton aria-label='delete' sx={{ fontSize: '20px' }}>
                              <CTooltip description='Excluir' placement='top'>
                                <DeleteOutlineOutlinedIcon />
                              </CTooltip>
                            </IconButton>
                          </TableCell>
                        ) : (
                          <TableCell>
                            <CTooltip description='Excluir' placement='top'>
                              <Box>
                                <IconButton aria-label='delete' sx={{ fontSize: '20px' }} disabled>
                                  <DeleteOutlineOutlinedIcon />
                                </IconButton>
                              </Box>
                            </CTooltip>
                          </TableCell>
                        )}
                      </>
                    )}
                    {onNotifyUser && (
                      <TableCell>
                        <UserOptions
                          handleDelete={() => onDelete(user.id, user.getRolesIds())}
                          handleNotify={() => onNotifyUser(user.id, user.getFullName())}
                          isPendingAccess={user.status === UserStatus.FIRST_ACCESS}
                        />
                      </TableCell>
                    )}
                    {onReactivateUser && (
                      <TableCell onClick={() => onReactivateUser(user)}>
                        <CTooltip description='Revincular usuário' placement='bottom'>
                          <Box>
                            <IconButton aria-label='delete' sx={{ fontSize: '20px' }}>
                              <AutorenewIcon />
                            </IconButton>
                          </Box>
                        </CTooltip>
                      </TableCell>
                    )}
                  </CTableRow>
                )
              })}
            </TableBody>
          )}
        </Table>
      </TableContainer>

      <Box p={2}>
        {users.length > 0 && (
          <CPagination
            count={Math.ceil(count / limit)}
            onChange={(e, page) => {
              onChangePage?.(page, (page - 1) * limit)
            }}
            page={Math.ceil(offset / limit + 1)}
            color='primary'
            totalCount={count}
          />
        )}
        {users.length < 1 && !isLoading && <NotFound />}
      </Box>
    </>
  )
}
