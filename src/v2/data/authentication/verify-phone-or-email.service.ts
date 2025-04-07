import { TApiRequest } from '@/v2/infra/request'

export class VerifyPhoneOrEmail {
  constructor(private readonly apiRequest: TApiRequest) {}
  async verify({ token, isTelephone }: { token?: string; isTelephone: boolean }) {
    if (!isTelephone) {
      await this.apiRequest.execute({
        path: 'me/verify-email-token',
        method: 'POST',
        body: { token },
      })
      return true
    }
    await this.apiRequest.execute({
      path: 'me/verify-phone-token',
      method: 'POST',
      body: { token },
    })

    return true
  }
}
