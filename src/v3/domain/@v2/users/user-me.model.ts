import { UserModel, UserModelConstructor } from './users.model'

export interface UserMeModelConstructor {
  user: UserModelConstructor
  institutionalSettings: { name: string }[]
  token: { attendanceOnly: boolean; surveyOnly: boolean }
}

export class UserMeModel {
  public readonly user: UserModel
  public readonly institutionalSettings: { name: string }[]
  public readonly token: { attendanceOnly: boolean; surveyOnly: boolean }

  constructor(data: UserMeModelConstructor) {
    this.user = new UserModel(data.user)
    this.institutionalSettings = data.institutionalSettings
    this.token = data.token
  }
}
