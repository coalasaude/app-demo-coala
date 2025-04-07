import { BrowsePeiPdi } from './browse-pei-pdi.model'

export type BrowsePlanConstructor = {
  result?: BrowsePeiPdi[]
  count: number
}

export class BrowsePlan {
  result?: BrowsePeiPdi[]
  count: number

  constructor(params: BrowsePlanConstructor) {
    this.count = params.count
    this.result = params.result
  }
}
