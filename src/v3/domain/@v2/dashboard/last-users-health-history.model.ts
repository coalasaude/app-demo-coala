import dayjs from 'dayjs'

export class LastUsersHealthHistoryModel {
  public readonly id: number
  public readonly createdAt: Date
  public readonly name: string

  constructor(data: LastUsersHealthHistoryModel) {
    this.id = data.id
    this.createdAt = data.createdAt
    this.name = data.name
  }

  get date() {
    return dayjs(this.createdAt).format('DD.MM.YYYY\nHH:mm')
  }
}
