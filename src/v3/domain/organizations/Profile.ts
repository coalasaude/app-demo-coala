import { TApiProfile } from '../api/organizations/ApiInstitutionSettings'

export class Profile {
  id: number
  name: string

  constructor(params: TApiProfile) {
    this.id = params?.id
    this.name = params?.name
  }
}
