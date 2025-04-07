import dayjs from 'dayjs'

import { capitalizeName } from '@/utils/capitalizeName'

import { ImageModel, ImageModelConstructor } from './image.model'

export type LastAppointmentsModelConstructor = {
  id: number
  name: string
  profile: string
  image?: ImageModelConstructor
  createdAt: Date
}

export class LastAppointmentsModel {
  public readonly id: number
  public readonly name: string
  public readonly profile: string
  public readonly image?: ImageModel
  public readonly createdAt: Date

  constructor(data: LastAppointmentsModelConstructor) {
    this.id = data.id
    this.name = !data.name ? 'Não Definido' : capitalizeName(data.name)
    this.profile = data.profile || 'Não Definido'
    this.image = data.image ? new ImageModel(data.image) : undefined
    this.createdAt = data.createdAt
  }

  get date() {
    return dayjs(this.createdAt).format('DD.MM.YYYY')
  }
}
