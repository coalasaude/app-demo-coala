import { MentalHealthSubCategory } from './subcategory.model'

type BrowseSubCategoryConstructor = {
  result: MentalHealthSubCategory[]
  count: number
}

export class BrowseSubCategory {
  result: MentalHealthSubCategory[]
  count: number

  constructor(params: BrowseSubCategoryConstructor) {
    this.count = params.count || 0
    this.result = params.result || []
  }
}
