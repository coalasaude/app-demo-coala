import { UserStatus } from '@/types/user'
import { UserSummaryModel } from '@/v3/domain/@v2/users/users-summary.model'
import { GetUsersFilters } from '@/v3/infra/services/user/user'

export interface IUserListTable {
  users?: UserSummaryModel[]
  count?: number
  isLoading?: boolean
  onClickUserRow?: (userId: number) => void
  setFilters: (filter: IUserFilterFields) => void
  onChangePage?: (page: number, offset: number) => void
  offset?: number
  orderBy?: GetUsersFilters['orderBy']
  direction?: GetUsersFilters['direction']
  onChangeSelectedUsers?: (event: React.ChangeEvent<HTMLInputElement>, id: number) => void
  selectedUsers?: Set<number>
  institutionId?: number
  networkId?: number
  brandId?: number
  onNotifyUser?: (userId: number, name: string) => void
  onReactivateUser?: (user: UserSummaryModel) => void
}

export interface IUserFilterFields {
  searchUser?: string
  offset?: number
  orderBy?: GetUsersFilters['orderBy']
  direction?: GetUsersFilters['direction']
  searchEmail?: string
  searchTelephone?: string
  status?: UserStatus
  institutionId?: number
  profileId?: number
}

export interface IDrawerFilterUserListTable {
  open: boolean
  onClose: () => Promise<void> | void
  setFilters: (filter: IUserFilterFields) => void
  filters: IUserFilterFields
  profiles: { value: number; label: string }[]
}
