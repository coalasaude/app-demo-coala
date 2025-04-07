import { TSnackbar } from '@/context/LayoutProvider'
import { TApiRequest } from '@/v2/infra/request'

export class SignUserTerms {
  constructor(private readonly apiRequest: TApiRequest, private readonly showSnackbar: TSnackbar) {}
  async sign({
    name,
    lastname,
    cpf,
    isSigned
  }: {
    name?: string
    lastname: string
    cpf: string
    isSigned: string
  }) {
    try {
      await this.apiRequest.execute({
        path: 'auth/register',
        method: 'POST',
        body: {
          name,
          lastname,
          user_term: isSigned,
          grant_term: isSigned,
          cpf,
          isSigned: true
        },
        useSpinner: true
      })
      const meData = await this.apiRequest.execute({
        path: 'me',
        method: 'GET'
      })

      return meData
    } catch (e: any) {
      this.showSnackbar({
        message: e.data.message || 'Não foi possível concluir o registro',
        type: 'error'
      })
      throw e
    }
  }
}
