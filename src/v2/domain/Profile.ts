export class Profile {
  id: number
  name: string
  institutionTypeId?: number
  type: string
  registrationDescription?: string

  constructor(params: {
    id: number
    name: string
    institutionTypeId?: number
    type: string
    registrationDescription?: string
  }) {
    this.id = params.id
    this.name = params.name
    this.institutionTypeId = params.institutionTypeId
    this.type = params.type
    this.registrationDescription = params.registrationDescription
  }
}
