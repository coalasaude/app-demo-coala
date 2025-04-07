import { User } from '@/types/user'

import apiRequest from '../api'

export const getMe = () =>
  apiRequest<User>({
    path: 'me',
    method: 'GET',
    throwError: true,
    useApiFilters: false,
  }) as Promise<User>
