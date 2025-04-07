import { MentalHealthCategory } from './category.model'

type BrowseCategoryConstructor = {
  result: MentalHealthCategory[]
  count: number
}

export class BrowseCategory {
  result: MentalHealthCategory[]
  count: number

  constructor(params: BrowseCategoryConstructor) {
    this.count = params.count || 0
    this.result = params.result || []
  }
}
