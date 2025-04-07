import dayjs from 'dayjs'

export interface BodyMassModelConstructor {
  id: number
  weight: number
  height: number
  measurementDate: Date
}

export class BodyMassModel {
  public readonly id: number
  weight: number
  height: number
  measurementDate: Date

  constructor(props: BodyMassModelConstructor) {
    this.id = props.id
    this.weight = props.weight
    this.height = props.height
    this.measurementDate = props.measurementDate
  }

  getFormattedMeasureDate() {
    if (this.measurementDate) return dayjs(this.measurementDate).format('DD/MM/YYYY')

    return ''
  }

  getFormattedMeasureDateAndDays() {
    if (!this.measurementDate) return '-'
    const daysDiff = dayjs().diff(this.measurementDate, 'days')
    const date = this.getFormattedMeasureDate()
    const days = daysDiff > 1 ? 'dias' : 'dia'
    const daysDiffStr = daysDiff === 0 ? 'Hoje' : days

    return `${date} (${daysDiffStr})`
  }

  getFormattedHeight() {
    if (!this?.height) return '-'
    const numStr = this.height.toString().padStart(3, '0')
    return `${numStr.slice(0, -2)},${numStr.slice(-2)}`
  }

  getFormattedHeightWithUnit() {
    if (!this?.height) return '-'
    const numStr = this.height.toString().padStart(3, '0')
    return `${numStr}cm`
  }

  getFormattedWeight() {
    if (!this?.weight) return '-'
    return this.weight ? `${this.weight}kg` : '-'
  }
}
