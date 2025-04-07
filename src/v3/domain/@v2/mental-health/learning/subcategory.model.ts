type SubCategoryConstructor = {
  id?: number
  name?: string
  description?: string
}

export class MentalHealthSubCategory {
  id?: number
  name?: string
  description?: string | null

  constructor(params: SubCategoryConstructor) {
    this.id = params.id || -1
    this.name = params.name
    this.description = params.description
  }
}
