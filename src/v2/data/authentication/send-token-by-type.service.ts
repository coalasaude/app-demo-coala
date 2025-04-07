import { TApiRequest } from '@/v2/infra/request'

export class SendTokenByAccessType {
  constructor(private readonly apiRequest: TApiRequest) {}
  async send({ access }: { access?: string }) {
    const isTelephone = /^((\d+)|(\()(\d{1,2})?(\))?( )?(\d{1,5})?( )?(\d{1,4})?)$/.test(
      access || ''
    )
    if (!isTelephone) {
      await this.apiRequest.execute({
        path: 'me/send-token',
        method: 'POST',
        body: { access: access },
      })
      return true
    }
    await this.apiRequest.execute({
      path: 'me/send-token',
      method: 'POST',
      body: { access: access },
    })

    return true
  }
}
