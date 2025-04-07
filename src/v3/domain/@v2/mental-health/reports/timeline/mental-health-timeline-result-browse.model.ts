import dayjs from 'dayjs'

import { ReportTimelineTypeEnum } from '../../enums/timeline-type.enum'

export interface MentalHealthTimelineResultBrowseModelConstructor {
  id: number
  type: ReportTimelineTypeEnum
  createdAt: Date
  createdUserName?: string
}

export class MentalHealthTimelineResultBrowseModel {
  id: number
  type: ReportTimelineTypeEnum
  createdAt: Date
  createdUserName?: string

  constructor(params: MentalHealthTimelineResultBrowseModelConstructor) {
    this.id = params.id
    this.type = params.type
    this.createdAt = params.createdAt
    this.createdUserName = params.createdUserName
  }

  get dateString(): string {
    return dayjs(this.createdAt).format('DD.MM.YYYY')
  }

  get timeString(): string {
    return dayjs(this.createdAt).format('HH:mm')
  }

  get description(): string {
    if (this.isRequest) return `${this.dateString} | ${this.timeString}`
    return `${this.createdUserName} | ${this.dateString} | ${this.timeString}`
  }

  get isRequest(): boolean {
    return this.type === ReportTimelineTypeEnum.REQUEST_ANALYSIS
  }
}
