import { phoneNormalizer } from '@/components/Forms'

export type ContactModelConstructor = {
  phone: string
  email?: string
  whatsapp?: string
}

export class ContactModel {
  private _phone: string
  private _whatsapp?: string
  email?: string

  constructor(params: ContactModelConstructor) {
    this._phone = params.phone
    this._whatsapp = params.whatsapp
    this.email = params.email
  }

  get phone() {
    return phoneNormalizer(this._phone)
  }

  get whatsapp() {
    return phoneNormalizer(this._whatsapp)
  }

  toJSON() {
    return {
      phone: this._phone,
      email: this.email,
      whatsapp: this._whatsapp,
    }
  }
}
