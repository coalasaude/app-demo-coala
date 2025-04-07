import { TUser } from '@/v2/domain/User'
import { TApiRequest } from '@/v2/infra/request'
import { TSnackbar } from '@/context/LayoutProvider'

export class LoginWithPasswordService {
  constructor(private readonly apiRequest: TApiRequest, private readonly showSnackbar: TSnackbar) {}
  async login({ access, password }: { access: string; password: string }) {
    try {
      const data = await this.apiRequest.execute<{
        user: TUser
        accessToken: string
        refreshToken: string
      }>({
        path: 'auth/login',
        method: 'POST',
        body: {
          access: access,
          password: password,
        },
        useSpinner: true,
      })

      return data
    } catch (e: any) {
      if (e?.data?.message) {
        this.showSnackbar({
          message: e.data.message,
          type: 'error',
        })
      }
    }
  }
}
