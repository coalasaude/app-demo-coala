import dayjs from 'dayjs'

import { DefaultStatus } from '@/types/status'

import { TBodyMass } from './api/ApiBodyMassResponse'

export class BodyMass {
  id: number
  status: DefaultStatus
  measurementDate: string
  createdAt: string
  height: number
  weight: number

  constructor(params: TBodyMass) {
    this.id = params.id
    this.status = params.status
    this.createdAt = params.created_at
    this.measurementDate = params.measurement_date
    this.weight = params.weight
    this.height = params.height
  }

  getFormattedMeasureDate() {
    if (this.measurementDate) return dayjs(this.measurementDate).format('DD/MM/YYYY')

    return ''
  }

  getFormattedHeight() {
    const numStr = this.height.toString().padStart(3, '0')
    return `${numStr.slice(0, -2)},${numStr.slice(-2)}`
  }
}
