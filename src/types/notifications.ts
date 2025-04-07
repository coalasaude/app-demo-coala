export interface Notifications {
  id: number
  UserNotifications: {
    id: string
  }[]
  data: any
  description: string
  title: string
  type: string
}
