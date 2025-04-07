import { MentalHealthSubCategory } from './subcategory.model'

type MentalHealthCategoryConstructor = {
  id?: number
  name?: string
  description?: string
  subCategory?: MentalHealthSubCategory
}

export class MentalHealthCategory {
  id?: number
  name?: string
  description?: string
  subCategory?: MentalHealthSubCategory

  constructor(params: MentalHealthCategoryConstructor) {
    this.id = params.id || -1
    this.name = params.name
    this.description = params.description
    this.subCategory = params.subCategory
  }
}
