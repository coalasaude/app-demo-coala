import { Box, BoxProps, Button } from '@mui/material'
import { FilterList } from '@mui/icons-material'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import { useRouter } from 'next/router'

import NavbarActions from '@/v3/presentation/components/NavbarActions'
import { useHasPermission } from '@/hooks/useHasPermission'
import { Permissions } from '@/constants/permissions'
import { NEW_ROUTES } from '@/constants/routes'
import HeaderButtonsPortal from '@/v3/presentation/components/PageHeader/HeaderButtonsPortal'
import useMediaQuery from '@/hooks/useMediaQuery'

import { EXPERIMENTAL_SearchInput } from '../../../components/EXPERIMENTAL_SearchInput'
import CChip from '../../atoms/CChip'

export interface ICFilterHeaderTable {
  placeholder?: string
  buttonLabel?: string
  buttonAction?: () => void
  deleteButtonLabel?: string
  deleteButtonAction?: () => void
  cancelDeleteButtonLabel?: string
  cancelDeleteButtonAction?: () => void
  onSearch?: (value: string) => void
  filterAction?: () => void
  boxProps?: BoxProps
  inputValue?: string
  chipsList?: { label: string; value: any }[]
  onChipDelete?: (deleteChip: string) => void
  children?: React.ReactNode
  isAppointmentFilter?: boolean
}

export const CFilterHeaderTable = ({
  buttonLabel = 'Acionar',
  placeholder = 'Pesquisar',
  buttonAction,
  filterAction,
  onSearch,
  boxProps,
  inputValue,
  chipsList,
  onChipDelete,
  deleteButtonLabel,
  children,
  isAppointmentFilter,
  deleteButtonAction,
  cancelDeleteButtonAction,
  cancelDeleteButtonLabel,
}: ICFilterHeaderTable) => {
  const router = useRouter()
  const institutionId = Number(router.query.institutionId)
  const [canAdd] = useHasPermission([Permissions.ADD_APPOINTMENT, Permissions.MANAGE_APPOINTMENT])
  const isSmallDevice = useMediaQuery('sm')

  return (
    <Box display='flex' flexDirection='column' gap={2} {...boxProps}>
      <Box display='flex' alignItems='center' width='100%' justifyContent='space-between'>
        <Box gap={1} display='flex' width='100%' flex={1}>
          {onSearch && (
            <EXPERIMENTAL_SearchInput
              name='search_input_user'
              onSearch={onSearch}
              placeholder={placeholder}
              defaultValue={inputValue}
              sx={{ width: [undefined, '50%'] }}
              data-testid='searchInputName'
            />
          )}
          {filterAction && (
            <Button
              variant='text'
              onClick={filterAction}
              size='medium'
              sx={{
                border: '1px solid var(--mui-palette-grey-300)',
                color: 'var(--mui-palette-grey-600)',
                width: 38,
                minWidth: 38,
                borderRadius: '4px',
              }}
            >
              <FilterList />
            </Button>
          )}
        </Box>
        {deleteButtonAction && (
          <>
            {cancelDeleteButtonLabel && (
              <Button
                onClick={cancelDeleteButtonAction}
                sx={{ minWidth: ['100%', 0], marginRight: 1 }}
                size='small'
                variant='outlined'
              >
                {cancelDeleteButtonLabel}
              </Button>
            )}

            <Button
              onClick={deleteButtonAction}
              sx={{ minWidth: ['100%', 0], marginRight: 1 }}
              size='small'
              variant='outlined'
            >
              {deleteButtonLabel}
            </Button>
          </>
        )}
        {buttonAction && (
          <NavbarActions>
            <Button onClick={buttonAction} sx={{ minWidth: ['100%', 0] }} size='small'>
              {buttonLabel}
            </Button>
          </NavbarActions>
        )}
        {children && <Box>{children}</Box>}
        {isAppointmentFilter && canAdd && (
          <HeaderButtonsPortal>
            <Button
              size='medium'
              fullWidth={isSmallDevice}
              onClick={() =>
                router.push({
                  pathname: NEW_ROUTES.AUTHENTICATED.APPOINTMENT.ADD.path,
                  ...(institutionId && { query: { institutionId } }),
                })
              }
            >
              Solicitar
            </Button>
          </HeaderButtonsPortal>
        )}
      </Box>

      {!!chipsList?.length && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            width: '100%',
            flexWrap: 'wrap',
          }}
        >
          {chipsList?.map((chip) => (
            <CChip
              variant='outlined'
              key={chip.label}
              size='medium'
              label={chip.label}
              deletable
              deleteIcon={<CancelOutlinedIcon />}
              onDelete={() => onChipDelete?.(chip.value)}
            />
          ))}
        </Box>
      )}
    </Box>
  )
}
